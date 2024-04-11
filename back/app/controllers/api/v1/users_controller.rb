class Api::V1::UsersController < Api::V1::BasesController
  def current_user
    set_user_by_token
    if @resource
      render json: { success: true, user: {id: @resource.id, name: @resource.name} }
    else
      render json: { success: false, message: 'User not found' }
    end
  end

  def set_user_by_token
    rc = User

    uid_name = DeviseTokenAuth.headers_names[:'uid']
    other_uid_name = DeviseTokenAuth.other_uid && DeviseTokenAuth.headers_names[DeviseTokenAuth.other_uid.to_sym]
    access_token_name = DeviseTokenAuth.headers_names[:'access-token']
    client_name = DeviseTokenAuth.headers_names[:'client']
    authorization_name = DeviseTokenAuth.headers_names[:"authorization"]

    # Read Authorization token and decode it if present
    decoded_authorization_token = decode_bearer_token(request.headers[authorization_name])

    # gets values from cookie if configured and present
    parsed_auth_cookie = {}
    if DeviseTokenAuth.cookie_enabled
      auth_cookie = request.cookies[DeviseTokenAuth.cookie_name]
      if auth_cookie.present?
        parsed_auth_cookie = JSON.parse(auth_cookie)
      end
    end

    # parse header for values necessary for authentication
    uid              = request.headers[uid_name] || params[uid_name] || parsed_auth_cookie[uid_name] || decoded_authorization_token[uid_name]
    other_uid        = other_uid_name && request.headers[other_uid_name] || params[other_uid_name] || parsed_auth_cookie[other_uid_name]
    @token           = DeviseTokenAuth::TokenFactory.new unless @token
    @token.token     ||= request.headers[access_token_name] || params[access_token_name] || parsed_auth_cookie[access_token_name] || decoded_authorization_token[access_token_name]
    @token.client ||= request.headers[client_name] || params[client_name] || parsed_auth_cookie[client_name] || decoded_authorization_token[client_name]

    # client isn't required, set to 'default' if absent
    @token.client ||= 'default'

    # check for an existing user, authenticated via warden/devise, if enabled
    if DeviseTokenAuth.enable_standard_devise_support
      devise_warden_user = warden.user(mapping)
      if devise_warden_user && devise_warden_user.tokens[@token.client].nil?
        @used_auth_by_token = false
        @resource = devise_warden_user
        # REVIEW: The following line _should_ be safe to remove;
        #  the generated token does not get used anywhere.
        # @resource.create_new_auth_token
      end
    end

    # user has already been found and authenticated
    return @resource if @resource && @resource.is_a?(rc)

    # ensure we clear the client
    unless @token.present?
      @token.client = nil
      return
    end

    # mitigate timing attacks by finding by uid instead of auth token
    user = (uid && rc.dta_find_by(uid: uid)) || (other_uid && rc.dta_find_by("#{DeviseTokenAuth.other_uid}": other_uid))
    scope = rc.to_s.underscore.to_sym

    if user && user.valid_token?(@token.token, @token.client)
      # sign_in with bypass: true will be deprecated in the next version of Devise
      if respond_to?(:bypass_sign_in) && DeviseTokenAuth.bypass_sign_in
        bypass_sign_in(user, scope: scope)
      else
        sign_in(scope, user, store: false, event: :fetch, bypass: DeviseTokenAuth.bypass_sign_in)
      end
      return @resource = user
    else
      # zero all values previously set values
      @token.client = nil
      return @resource = nil
    end
  end
end
