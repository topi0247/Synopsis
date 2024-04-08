class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[6.0]
  def change
    change_table :users do |t|
      t.string :provider, null: false, default: "email"
      t.string :uid, null: false, default: ""

      t.boolean :allow_password_change, default: false

      t.json :tokens

    end
    add_index :users, [:uid, :provider], unique: true
  end
end
