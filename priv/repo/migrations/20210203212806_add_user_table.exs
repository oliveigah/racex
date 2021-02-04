defmodule Racex.Repo.Migrations.AddUserTable do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :username, :string, null: false
      add :nick, :string
      add :qty_victories, :integer
      add :password_hash, :string
      timestamps()
    end

    create unique_index(:users, [:username])
  end
end
