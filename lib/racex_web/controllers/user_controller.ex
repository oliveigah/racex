defmodule RacexWeb.UserController do
  use RacexWeb, :controller

  alias Racex.Account
  alias Racex.Account.User

  def new(conn, _params) do
    changeset = Account.get_user_creation_form(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    case Account.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "#{user.username} created!")
        |> redirect(to: Routes.page_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
