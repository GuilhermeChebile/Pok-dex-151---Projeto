import { Heart, ArrowUpRight } from 'lucide-react'

const typeColors = {
  Normal: 'normal', Fire: 'fire', Water: 'water', Grass: 'grass', Electric: 'electric',
  Ice: 'ice', Fighting: 'fighting', Poison: 'poison', Ground: 'ground', Flying: 'flying',
  Psychic: 'psychic', Bug: 'bug', Rock: 'rock', Ghost: 'ghost', Dark: 'dark',
  Dragon: 'dragon', Steel: 'steel', Typeless: 'typeless'
}

export function TypeBadge({ type }) {
  return <span className={`type-badge type-${typeColors[type] || 'typeless'}`}>{type}</span>
}

export default function PokemonCard({ pokemon, onSelect, isFavorite, onToggleFavorite }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <article className="pokemon-card" onClick={() => onSelect(pokemon)}>
      <div className="card-topline">
        <span className="pokemon-number">Nº {String(pokemon.id).padStart(3, '0')}</span>
        <button
          className={`icon-button favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={(event) => {
            event.stopPropagation()
            onToggleFavorite(pokemon.id)
          }}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="pokemon-artwork">
        <span className="artwork-orbit" />
        <img src={imageUrl} alt={pokemon.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} />
      </div>
      <div className="pokemon-card-info">
        <h3>{pokemon.name}</h3>
        <div className="type-list">
          {pokemon.types.length > 0 ? pokemon.types.map((type) => <TypeBadge key={type.id} type={type.name} />) : <TypeBadge type="Typeless" />}
        </div>
        <div className="card-stats">
          <span><b>{pokemon.stats.hp}</b><small>HP</small></span>
          <span><b>{pokemon.stats.attack}</b><small>ATK</small></span>
          <span><b>{pokemon.stats.defense}</b><small>DEF</small></span>
        </div>
      </div>
      <div className="card-open"><span>Ver detalhes</span><ArrowUpRight size={15} /></div>
    </article>
  )
}
