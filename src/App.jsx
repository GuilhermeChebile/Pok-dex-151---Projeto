import { useMemo, useState } from 'react'
import { BookOpen, ChevronDown, Heart, Search, SlidersHorizontal, Sparkles, Users, X, Dices } from 'lucide-react'
import pokedexData from './data/pokedex-data.json'
import PokemonCard from './components/PokemonCard.jsx'
import PokemonDetails from './components/PokemonDetails.jsx'
import TrainerSection from './components/TrainerSection.jsx'
import './css/App.css'

function readFavorites() {
  try {
    const saved = localStorage.getItem('pokedex-favorites')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('Todos')
  const [sortBy, setSortBy] = useState('id')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [favorites, setFavorites] = useState(readFavorites)
  const [showFilters, setShowFilters] = useState(false)

  const pokemon = pokedexData.pokemon
  const trainers = pokedexData.trainers

  function toggleFavorite(id) {
    setFavorites((current) => {
      const updated = current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]
      localStorage.setItem('pokedex-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const visiblePokemon = useMemo(() => {
    let result = activePage === 'favoritos' ? pokemon.filter((item) => favorites.includes(item.id)) : pokemon
    const searchValue = search.trim().toLowerCase()

    if (searchValue) {
      result = result.filter((item) => item.name.toLowerCase().includes(searchValue) || String(item.id) === searchValue || String(item.id).padStart(3, '0') === searchValue)
    }

    if (selectedType !== 'Todos') {
      result = result.filter((item) => item.types.some((type) => type.name === selectedType))
    }

    result = [...result]
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'attack') result.sort((a, b) => b.stats.attack - a.stats.attack)
    else if (sortBy === 'hp') result.sort((a, b) => b.stats.hp - a.stats.hp)
    else if (sortBy === 'speed') result.sort((a, b) => b.stats.speed - a.stats.speed)
    else result.sort((a, b) => a.id - b.id)
    return result
  }, [activePage, pokemon, favorites, search, selectedType, sortBy])

  function choosePage(page) {
    setActivePage(page)
    setSearch('')
    setSelectedType('Todos')
  }

  function showRandomPokemon() {
    const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)]
    setSelectedPokemon(randomPokemon)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => choosePage('pokedex')} aria-label="Ir para a Pokédex"><span className="brand-icon"><span /></span><span>Poké<span>Data</span><small>POKÉDEX INTERATIVA</small></span></button>
        <nav className="main-nav" aria-label="Navegação principal">
          <button className={activePage === 'pokedex' ? 'active' : ''} onClick={() => choosePage('pokedex')}><BookOpen size={17} /> Pokédex</button>
          <button className={activePage === 'treinadores' ? 'active' : ''} onClick={() => choosePage('treinadores')}><Users size={17} /> Treinadores</button>
          <button className={activePage === 'favoritos' ? 'active' : ''} onClick={() => choosePage('favoritos')}><Heart size={17} /> Favoritos <span className="nav-count">{favorites.length}</span></button>
        </nav>
        <div className="topbar-right"><span className="generation-tag"><Sparkles size={14} /> KANTO · 001–151</span><button className="mobile-random" onClick={showRandomPokemon} aria-label="Pokémon aleatório"><Dices size={18} /></button></div>
      </header>

      <main className="main-content">
        {activePage === 'treinadores' ? (
          <TrainerSection trainers={trainers} pokemon={pokemon} onSelectPokemon={setSelectedPokemon} />
        ) : (
          <>
            <section className="hero-section">
              <div className="hero-copy"><div className="hero-eyebrow"><span className="live-dot" /> SUA AVENTURA COMEÇA AQUI</div><h1>{activePage === 'favoritos' ? <>Seus Pokémon <span>favoritos.</span></> : <>Conheça todos. <span>Capture a curiosidade.</span></>}</h1><p>{activePage === 'favoritos' ? 'Os Pokémon que você marcou ficam reunidos aqui.' : 'Explore os Pokémon da região de Kanto, descubra seus atributos e encontre seu próximo companheiro.'}</p><div className="hero-actions"><button className="primary-button" onClick={() => document.getElementById('pokemon-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><BookOpen size={17} /> Explorar Pokédex</button><button className="secondary-button" onClick={showRandomPokemon}><Dices size={17} /> Pokémon aleatório</button></div><div className="hero-meta"><span><b>{pokemon.length}</b> Pokémon disponíveis</span><span className="meta-divider" /><span><b>{pokedexData.types.length - 1}</b> tipos para descobrir</span></div></div>
              <div className="hero-art"><div className="hero-glow" /><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-pokeball"><span /></div><div className="hero-chip chip-top">#001 — #151</div><div className="hero-chip chip-bottom"><span className="chip-dot" /> DADOS DA POKÉDEX</div></div>
            </section>

            <section className="collection-section" id="pokemon-grid">
              <div className="section-heading collection-heading"><div><span className="eyebrow">SUA ENCICLOPÉDIA POKÉMON</span><h2>{activePage === 'favoritos' ? 'Meus favoritos' : 'Explore a Pokédex'} <span className="result-count">{visiblePokemon.length}</span></h2><p>{activePage === 'favoritos' ? 'Sua coleção pessoal de Pokémon salvos.' : 'Pesquise, filtre e selecione um Pokémon para ver sua ficha completa.'}</p></div><button className={`filter-toggle ${showFilters ? 'filter-active' : ''}`} onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={17} /> Filtros <ChevronDown size={15} /></button></div>
              <div className="search-filter-row"><label className="search-box"><Search size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nome ou número..." /><kbd>⌕</kbd>{search && <button onClick={() => setSearch('')} aria-label="Limpar pesquisa"><X size={15} /></button>}</label><label className="sort-select"><span>Ordenar por</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="id">Número da Pokédex</option><option value="name">Nome (A–Z)</option><option value="attack">Maior ataque</option><option value="hp">Maior HP</option><option value="speed">Maior velocidade</option></select></label></div>
              <div className={`type-filter ${showFilters ? 'type-filter-open' : ''}`}><span className="filter-label">TIPO</span><div className="type-filter-buttons"><button className={selectedType === 'Todos' ? 'selected' : ''} onClick={() => setSelectedType('Todos')}>Todos</button>{pokedexData.types.filter((type) => type.name !== 'Typeless').map((type) => <button key={type.id} className={selectedType === type.name ? `selected type-${type.name.toLowerCase()}` : ''} onClick={() => setSelectedType(selectedType === type.name ? 'Todos' : type.name)}>{type.name}</button>)}</div></div>
              {visiblePokemon.length === 0 ? <div className="empty-state"><div className="empty-icon"><Search size={26} /></div><h3>{activePage === 'favoritos' && favorites.length === 0 ? 'Sua lista está vazia' : 'Nenhum Pokémon encontrado'}</h3><p>{activePage === 'favoritos' && favorites.length === 0 ? 'Use o coração nos cards para salvar seus Pokémon preferidos.' : 'Tente mudar a pesquisa ou selecionar outro tipo.'}</p><button className="secondary-button" onClick={() => { setSearch(''); setSelectedType('Todos'); if (activePage === 'favoritos' && favorites.length === 0) choosePage('pokedex') }}>Limpar filtros</button></div> : <div className="pokemon-grid">{visiblePokemon.map((item) => <PokemonCard key={item.id} pokemon={item} onSelect={setSelectedPokemon} isFavorite={favorites.includes(item.id)} onToggleFavorite={toggleFavorite} />)}</div>}
              {visiblePokemon.length > 0 && <div className="results-footer">Mostrando <b>{visiblePokemon.length}</b> de <b>{activePage === 'favoritos' ? favorites.length : pokemon.length}</b> Pokémon <span>•</span> Dados carregados localmente</div>}
            </section>
          </>
        )}
      </main>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-icon small"><span /></span><b>PokéData</b></div><p>Projeto acadêmico desenvolvido com React + Vite.</p><span className="footer-note">Dados fornecidos na atividade · Imagens: PokéAPI Sprites</span></footer>
      <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} isFavorite={selectedPokemon ? favorites.includes(selectedPokemon.id) : false} onToggleFavorite={toggleFavorite} />
    </div>
  )
}
