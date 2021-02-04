defmodule Racex.Account do
  alias Racex.Repo
  alias Racex.Account.User

  def get_user_creation_form(%User{} = user) do
    User.get_creation_changeset(user)
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.get_creation_changeset(attrs)
    |> Repo.insert()
  end

  def get_user_by(params) do
    Repo.get_by(User, params)
  end

  def authenticate(username, given_pass) do
    user = get_user_by(username: username)

    is_correct = user && Pbkdf2.verify_pass(given_pass, user.password_hash)

    cond do
      is_correct ->
        {:ok, user}

      user ->
        {:error, :unauthorized}

      true ->
        Pbkdf2.no_user_verify()
        {:error, :not_found}
    end
  end
end
