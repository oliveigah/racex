defmodule RacexWeb.Auth do
  import Plug.Conn

  def init(opts) do
    opts
  end

  def call(conn, _opts) do
    user_id = get_session(conn, :user_id)
    user = user_id && Racex.Account.get_user_by(id: user_id)
    assign(conn, :current_user, user)
  end

  def add_user_on_session(conn, user) do
    conn
    |> assign(:current_user, user)
    |> put_session(:user_id, user.id)
    |> configure_session(renew: true)
  end

  def remove_user_from_session(conn) do
    configure_session(conn, drop: true)
  end
end
