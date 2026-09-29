import React, { useState, useEffect } from "react";

const DEFAULT_GENRES = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Thriller", "Romance"];

export default function Movie({ user, onLogout }) {
  // Movie & Genre State
  const [movies, setMovies] = useState([]);
  const [customGenres, setCustomGenres] = useState(DEFAULT_GENRES);

  // Form State
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [dateWatched, setDateWatched] = useState("");
  const [platform, setPlatform] = useState("TV");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [standout, setStandout] = useState("");
  const [newGenreInput, setNewGenreInput] = useState("");

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  // Load User Data from localStorage
  useEffect(() => {
    if (user) {
      const userMovies = localStorage.getItem(`mlog_movies_${user.name}`);
      const userGenres = localStorage.getItem(`mlog_genres_${user.name}`);
      setMovies(userMovies ? JSON.parse(userMovies) : []);
      setCustomGenres(userGenres ? JSON.parse(userGenres) : DEFAULT_GENRES);
    }
  }, [user]);

  // Save Movies & Genres to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`mlog_movies_${user.name}`, JSON.stringify(movies));
    }
  }, [movies, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`mlog_genres_${user.name}`, JSON.stringify(customGenres));
    }
  }, [customGenres, user]);

  // Handlers
  const handleAddGenre = (e) => {
    e.preventDefault();
    const trimmed = newGenreInput.trim();
    if (trimmed && !customGenres.includes(trimmed)) {
      setCustomGenres([...customGenres, trimmed]);
      setNewGenreInput("");
    }
  };

  const handleGenreToggle = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dateWatched) return;

    const newMovie = {
      id: Date.now(),
      title,
      releaseYear,
      dateWatched,
      platform,
      genres: selectedGenres,
      standout,
    };

    setMovies([newMovie, ...movies]);

    // Reset Form
    setTitle("");
    setReleaseYear("");
    setDateWatched("");
    setPlatform("TV");
    setSelectedGenres([]);
    setStandout("");
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Filter and Sort Logic
  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.standout.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre =
        filterGenre === "All" || movie.genres.includes(filterGenre);
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateWatched);
      const dateB = new Date(b.dateWatched);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header / Navbar */}
        <header className="border-b border-slate-700 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
              🎬 mlog
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Welcome back, <span className="text-indigo-300 font-semibold">{user.name}</span>!
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg border border-slate-700 transition"
          >
            Logout
          </button>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Movie Form */}
          <section className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">Log a Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Movie Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dune: Part Two"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Release Year</label>
                  <input
                    type="number"
                    placeholder="2024"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Date Watched *</label>
                  <input
                    type="date"
                    required
                    value={dateWatched}
                    onChange={(e) => setDateWatched(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Theatre">Theatre</option>
                  <option value="TV">TV</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>

              {/* Dynamic Genres */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Genres</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {customGenres.map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => handleGenreToggle(g)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition ${
                        selectedGenres.includes(g)
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add custom genre..."
                    value={newGenreInput}
                    onChange={(e) => setNewGenreInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddGenre}
                    className="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">What Stood Out?</label>
                <textarea
                  rows="3"
                  placeholder="Stunning visual effects and sound design..."
                  value={standout}
                  onChange={(e) => setStandout(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition duration-200"
              >
                Save Log Entry
              </button>
            </form>
          </section>

          {/* Movie Logs Display Area */}
          <section className="lg:col-span-2 space-y-6">
            
            {/* Search, Filter, Sort Bar */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Search titles or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />

              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Genres</option>
                {customGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="desc">Watched Date: Newest First</option>
                <option value="asc">Watched Date: Oldest First</option>
              </select>
            </div>

            {/* List of Entries */}
            <div className="space-y-4">
              {filteredMovies.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-800">
                  <p className="text-slate-400">No movie logs found.</p>
                </div>
              ) : (
                filteredMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3 shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {movie.title}{" "}
                          {movie.releaseYear && (
                            <span className="text-slate-400 text-sm font-normal">
                              ({movie.releaseYear})
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-indigo-400 mt-1">
                          Watched on {movie.dateWatched} via{" "}
                          <span className="font-semibold">{movie.platform}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="text-slate-500 hover:text-red-400 text-xs px-2.5 py-1 rounded border border-transparent hover:border-red-900 transition"
                      >
                        Delete
                      </button>
                    </div>

                    {movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {movie.genres.map((g) => (
                          <span
                            key={g}
                            className="bg-slate-700 text-slate-300 text-xs px-2.5 py-0.5 rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    )}

                    {movie.standout && (
                      <blockquote className="border-l-2 border-indigo-500 pl-3 text-sm text-slate-300 italic">
                        "{movie.standout}"
                      </blockquote>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}