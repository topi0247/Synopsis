class Api::V1::AccountsController < Api::V1::BasesController
  def show
    if current_user
      render json: { success: true, user: {id: current_user.id, name: current_user.name,email: current_user.email} }
    else
      render json: { success: false, message: 'User not found' }
    end
  end
end
