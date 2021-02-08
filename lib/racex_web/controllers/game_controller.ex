defmodule RacexWeb.GameController do
  use RacexWeb, :controller

  alias Racex.Game
  alias Racex.Game.Race

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
    changeset = Game.get_game_creation_form(%Race{})
    render(conn, "new.html", changeset: changeset)
  end
end
