import { X, Heart, Shield, Swords, Zap, Activity, Sparkles, HeartPulse } from 'lucide-react'
import { TypeBadge } from './PokemonCard.jsx'

const statInfo = [
  { key: 'hp', label: 'HP', icon: HeartPulse, color: 'hp' },
  { key: 'attack', label: 'Ataque', icon: Swords, color: 'attack' },
  { key: 'defense', label: 'Defesa', icon: Shield, color: 'defense' },
  { key: 'specialAttack', label: 'Ataque especial', icon: Sparkles, color: 'special' },
  { key: 'specialDefense', label: 'Defesa especial', icon: Shield, color: 'special-defense' },
  { key: 'speed', label: 'Velocidade', icon: Zap, color: 'speed' }
]

export default function PokemonDetails({ pokemon, onClose, isFavorite, onToggleFavorite }) {
  if (!pokemon) return null
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  const total = Object.values(pokemon.stats).reduce((sum, value) => sum + value, 0)

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="details-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Fechar detalhes"><X size={21} /></button>
        <div className="details-visual">
          <div className="details-number">POKÉMON Nº {String(pokemon.id).padStart(3, '0')}</div>
          <div className="details-artwork"><img src={imageUrl} alt={pokemon.name} onError={(event) => { event.currentTarget.style.display = 'none' }} /></div>
          <div className="details-types">
            {pokemon.types.length > 0 ? pokemon.types.map((type) => <TypeBadge key={type.id} type={type.name} />) : <TypeBadge type="Typeless" />}
          </div>
        </div>
        <div className="details-content">
          <div className="details-title-row">
            <div><span className="eyebrow">FICHA DO POKÉMON</span><h2 id="details-title">{pokemon.name}</h2></div>
            <button className={`favorite-detail ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(pokemon.id)}><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Favoritado' : 'Favoritar'}</button>
          </div>
          <p className="details-description">Confira os atributos base deste Pokémon.</p>
          <div className="stats-heading"><span>Atributos</span><span>Total <b>{total}</b></span></div>
          <div className="stats-list">
            {statInfo.map(({ key, label, icon: Icon, color }) => (
              <div className="stat-row" key={key}>
                <div className="stat-label"><Icon size={16} /><span>{label}</span></div>
                <b className="stat-value">{pokemon.stats[key]}</b>
                <div className="stat-track"><span className={`stat-fill stat-${color}`} style={{ width: `${Math.min(pokemon.stats[key] / 160 * 100, 100)}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="details-footnote"><Activity size={16} /> Valores base presentes no arquivo de dados da atividade.</div>
        </div>
      </section>
    </div>
  )
}
