defmodule Racex.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :username, :string
    field :password, :string, virtual: true
    field :nick, :string
    field :qty_victories, :integer
    field :password_hash, :string
    timestamps()
  end

  def get_base_changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :nick])
    |> validate_required([:name, :username, :nick])
    |> validate_length(:username, min: 3, max: 20)
    |> validate_length(:nick, min: 1, max: 5)
  end

  def get_creation_changeset(user, attrs \\ %{}) do
    user
    |> get_base_changeset(attrs)
    |> cast(attrs, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 5, max: 50)
    |> generate_password_hash()
  end

  defp generate_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: incoming_pwd}} ->
        hash_pwd = Pbkdf2.hash_pwd_salt(incoming_pwd)
        put_change(changeset, :password_hash, hash_pwd)

      _ ->
        changeset
    end
  end
end
