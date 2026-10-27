import { useState } from 'react'
import { Award, Search, Users } from 'lucide-react'
import { TypeBadge } from './PokemonCard.jsx'

export default function TrainerSection({ trainers, pokemon, onSelectPokemon }) {
  const [search, setSearch] = useState('')
  const filteredTrainers = trainers.filter((trainer) => trainer.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="trainers-page">
      <div className="section-heading">
        <div><span className="eyebrow">QUEM ESTÁ NA JORNADA?</span><h2>Treinadores</h2><p>Consulte os treinadores e os Pokémon relacionados a cada um.</p></div>
        <div className="heading-count"><Users size={18} /> {filteredTrainers.length} treinadores</div>
      </div>
      <label className="trainer-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar treinador..." /></label>
      {filteredTrainers.length === 0 ? <div className="empty-state"><Users size={34} /><h3>Nenhum treinador encontrado</h3><p>Tente pesquisar por outro nome.</p></div> : (
        <div className="trainer-grid">
          {filteredTrainers.map((trainer) => {
            const team = trainer.pokemonIds.map((id) => pokemon.find((item) => item.id === id)).filter(Boolean)
            return (
              <article className="trainer-card" key={trainer.id}>
                <div className="trainer-card-header"><div className="trainer-avatar">{trainer.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div><div><h3>{trainer.name}</h3><span>Treinador #{String(trainer.id).padStart(2, '0')}</span></div></div>
                <div className="trainer-badges"><Award size={16} /><b>{trainer.badges}</b> insígnias</div>
                <div className="team-title">Pokémon relacionados <span>{team.length}</span></div>
                <div className="trainer-team">
                  {team.length ? team.map((item, index) => <button className="team-pokemon" key={`${item.id}-${index}`} onClick={() => onSelectPokemon(item)} title={`Ver ${item.name}`}><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt="" loading="lazy" /><span>{item.name}</span></button>) : <p className="no-team">Nenhum Pokémon relacionado nos dados.</p>}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
