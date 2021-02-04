defmodule RacexWeb.SessionController do
  use RacexWeb, :controller

  alias Racex.Account

  def new(conn, _params) do
    render(conn, "new.html")
  end

  def create(conn, %{"session" => %{"username" => username, "password" => given_pass}}) do
    case Account.authenticate(username, given_pass) do
      {:ok, user} ->
        conn
        |> RacexWeb.Auth.add_user_on_session(user)
        |> put_flash(:info, "Successful Login")
        |> redirect(to: Routes.page_path(conn, :index))

      {:error, _reason} ->
        conn
        |> put_flash(:error, "Invalid username/password combination")
        |> render("new.html")
    end
  end

  def delete(conn, _) do
    conn
    |> RacexWeb.Auth.remove_user_from_session()
    |> redirect(to: Routes.page_path(conn, :index))
  end
end
