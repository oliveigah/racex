defmodule RacexWeb.PageController do
  use RacexWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
