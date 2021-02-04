defmodule RacexWeb.GameController do
  use RacexWeb, :controller

  plug :authenticate_session when action in [:new]

  def authenticate_session(conn, _opts) do
    if conn.assigns.current_user do
      conn
    else
      conn
      |> put_flash(:error, "You must be logged in to access this page")
      |> redirect(to: Routes.page_path(conn, :index))
      |> halt()
    end
  end

  def new(conn, _params) do
    render(conn, "index.html")
  end
end
