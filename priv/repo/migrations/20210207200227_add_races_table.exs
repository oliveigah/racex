defmodule Racex.Repo.Migrations.AddRacesTable do
  use Ecto.Migration

  def change do
    create table(:races) do
      add :map, :string
      add :laps, :integer
      add :players, :map
      add :result, :map
      add :owner_id, references(:users, on_delete: :nothing)
      timestamps()
    end
  end
end
