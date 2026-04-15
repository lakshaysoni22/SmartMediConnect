import React, { useState } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Cardiology' | 'Technology' | 'Research' | 'Policy' | 'Public Health' | 'Innovation';
  source: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  isBookmarked: boolean;
  isTrending: boolean;
}

export function DoctorMedicalNewsAdvanced() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'AI-Powered Diagnostic Tool Shows 95% Accuracy in Early Cancer Detection',
      summary: 'New machine learning algorithm demonstrates unprecedented accuracy in identifying early-stage cancers across multiple organ systems.',
      content: 'Researchers at Stanford Medical Center have developed an artificial intelligence system that can detect early-stage cancers with 95% accuracy. The system analyzes medical imaging, blood markers, and patient history to identify subtle patterns that human physicians might miss. Clinical trials involving 10,000 patients showed the AI correctly identified cancers an average of 6 months earlier than traditional diagnostic methods. The technology is expected to be available in major hospitals by late 2026.',
      category: 'Technology',
      source: 'Journal of Medical Innovation',
      author: 'Dr. Sarah Chen',
      date: 'Jan 15, 2026',
      readTime: '5 min',
      image: 'AI',
      tags: ['AI', 'Cancer', 'Diagnostics', 'Innovation'],
      isBookmarked: false,
      isTrending: true
    },
    {
      id: '2',
      title: 'Revolutionary Heart Failure Treatment Reduces Mortality by 40%',
      summary: 'Clinical trial results show new combination therapy significantly improves outcomes for heart failure patients.',
      content: 'A groundbreaking study published in the New England Journal of Medicine reveals that a novel combination of medications reduces heart failure mortality by 40%. The treatment combines a new class of drugs called cardiac regenerative agents with traditional therapies. Over 5,000 patients participated in the multi-center trial spanning 3 years. Side effects were minimal, and quality of life improvements were substantial. Cardiologists are calling this the most significant advancement in heart failure treatment in two decades.',
      category: 'Cardiology',
      source: 'New England Journal of Medicine',
      author: 'Dr. Michael Anderson',
      date: 'Jan 14, 2026',
      readTime: '7 min',
      image: 'HR',
      tags: ['Cardiology', 'Heart Failure', 'Clinical Trial', 'Treatment'],
      isBookmarked: true,
      isTrending: true
    },
    {
      id: '3',
      title: 'FDA Approves First Gene Therapy for Type 1 Diabetes',
      summary: 'Landmark approval offers hope for millions of patients with autoimmune diabetes.',
      content: 'The FDA has approved GeneRestore-D1, the first gene therapy for Type 1 diabetes. The one-time treatment modifies immune cells to stop attacking insulin-producing beta cells while simultaneously stimulating beta cell regeneration. Phase 3 trials showed 78% of patients achieved insulin independence within 6 months. The therapy costs $450,000 but is expected to be covered by most insurance plans. Endocrinologists anticipate this will transform diabetes management.',
      category: 'Research',
      source: 'FDA News Release',
      author: 'FDA Medical Review Team',
      date: 'Jan 12, 2026',
      readTime: '6 min',
      image: 'GT',
      tags: ['Diabetes', 'Gene Therapy', 'FDA', 'Breakthrough'],
      isBookmarked: true,
      isTrending: true
    },
    {
      id: '4',
      title: 'New Medicare Policies Expand Telemedicine Coverage in 2026',
      summary: 'CMS announces major expansion of reimbursable telehealth services for all specialties.',
      content: 'The Centers for Medicare & Medicaid Services (CMS) has announced sweeping changes to telemedicine reimbursement policies. Starting February 2026, all medical specialties can bill for virtual consultations at parity with in-person visits. The policy also removes geographic restrictions and allows patients to receive care from any licensed provider in their state. Mental health services, chronic disease management, and post-operative follow-ups are specifically highlighted. Healthcare economists predict this will increase access to care for rural and underserved populations.',
      category: 'Policy',
      source: 'CMS Policy Update',
      author: 'Centers for Medicare & Medicaid Services',
      date: 'Jan 10, 2026',
      readTime: '4 min',
      image: 'MP',
      tags: ['Telemedicine', 'Medicare', 'Policy', 'Reimbursement'],
      isBookmarked: false,
      isTrending: false
    },
    {
      id: '5',
      title: 'Global Study Links Air Quality to Alzheimer\'s Risk',
      summary: 'Multi-national research identifies specific air pollutants that accelerate cognitive decline.',
      content: 'A comprehensive study involving 200,000 participants across 15 countries has established a clear link between air pollution and Alzheimer\'s disease risk. Researchers found that exposure to fine particulate matter (PM2.5) and nitrogen dioxide increased dementia risk by up to 60%. The study tracked participants for 20 years, controlling for genetics, lifestyle, and other risk factors. Scientists recommend air quality monitoring as part of Alzheimer\'s prevention strategies.',
      category: 'Public Health',
      source: 'The Lancet Neurology',
      author: 'International Research Consortium',
      date: 'Jan 8, 2026',
      readTime: '8 min',
      image: 'PH',
      tags: ['Alzheimer\'s', 'Public Health', 'Air Quality', 'Prevention'],
      isBookmarked: false,
      isTrending: false
    },
    {
      id: '6',
      title: 'Breakthrough mRNA Vaccine Shows Promise Against Multiple Cancers',
      summary: 'Personalized cancer vaccine demonstrates remarkable results in Phase 2 trials.',
      content: 'Building on mRNA technology developed for COVID-19 vaccines, researchers have created personalized cancer vaccines that train the immune system to target tumor cells. Early trials in melanoma, lung cancer, and pancreatic cancer show 85% of patients experienced tumor shrinkage or stabilization. The vaccine is created by sequencing a patient\'s tumor and designing mRNA to target specific mutations. Treatment takes just 6 weeks to develop and administer. Phase 3 trials are expected to begin in mid-2026.',
      category: 'Innovation',
      source: 'Nature Medicine',
      author: 'Dr. Jennifer Martinez',
      date: 'Jan 6, 2026',
      readTime: '9 min',
      image: 'MV',
      tags: ['mRNA', 'Cancer', 'Vaccine', 'Immunotherapy'],
      isBookmarked: true,
      isTrending: true
    },
    {
      id: '7',
      title: 'Surgeons Perform First Successful Full Heart Transplant Using Robot',
      summary: 'Robotic surgery milestone achieved with complete cardiac transplantation.',
      content: 'A surgical team at Johns Hopkins Hospital successfully completed the world\'s first fully robotic heart transplant. The 8-hour procedure was performed using the Da Vinci X4 surgical system with AI-assisted precision. The patient, a 52-year-old with end-stage heart failure, is recovering well. Surgeons report that robotic precision reduced bleeding, shortened recovery time, and improved surgical outcomes. This marks a new era in transplant surgery.',
      category: 'Technology',
      source: 'Johns Hopkins Medicine',
      author: 'Dr. Robert Chen',
      date: 'Jan 4, 2026',
      readTime: '6 min',
      image: 'RS',
      tags: ['Robotic Surgery', 'Transplant', 'Cardiology', 'Innovation'],
      isBookmarked: false,
      isTrending: false
    },
    {
      id: '8',
      title: 'Childhood Obesity Rates Drop 15% Following School Nutrition Program',
      summary: 'National initiative shows significant impact on pediatric health outcomes.',
      content: 'A comprehensive 5-year study reveals that a federal school nutrition program has reduced childhood obesity rates by 15% across participating districts. The program provides free healthy meals, nutrition education, and physical activity requirements. Over 10 million children benefited from the initiative. Researchers noted improvements in academic performance, attendance, and overall health markers including blood pressure and cholesterol levels.',
      category: 'Public Health',
      source: 'CDC Public Health Report',
      author: 'Centers for Disease Control',
      date: 'Jan 2, 2026',
      readTime: '5 min',
      image: 'CH',
      tags: ['Pediatrics', 'Obesity', 'Nutrition', 'Prevention'],
      isBookmarked: false,
      isTrending: false
    }
  ]);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = filterCategory === 'all' || article.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesBookmark = !bookmarkedOnly || article.isBookmarked;
    return matchesCategory && matchesSearch && matchesBookmark;
  });

  const toggleBookmark = (id: string) => {
    setArticles(prev => prev.map(article =>
      article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
    ));
  };

  const getCategoryColor = (category: NewsArticle['category']) => {
    switch (category) {
      case 'Cardiology': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Technology': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'Research': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case 'Policy': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'Public Health': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Innovation': return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400';
    }
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-4xl">
                newspaper
              </span>
              Medical News & Research
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Latest updates in healthcare and medical science
            </p>
          </div>
          <button
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              bookmarkedOnly
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
            }`}
          >
            <span className="material-symbols-outlined">bookmark</span>
            {bookmarkedOnly ? 'Show All' : 'Bookmarked Only'}
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="cardiology">Cardiology</option>
            <option value="technology">Technology</option>
            <option value="research">Research</option>
            <option value="policy">Policy</option>
            <option value="public health">Public Health</option>
            <option value="innovation">Innovation</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Articles List */}
        <div className={`${selectedArticle ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {/* Trending Section */}
          {filterCategory === 'all' && !searchQuery && !bookmarkedOnly && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">trending_up</span>
                Trending Now
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.filter(a => a.isTrending).slice(0, 2).map((article) => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white cursor-pointer hover:from-indigo-600 hover:to-indigo-700 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id);
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined">
                          {article.isBookmarked ? 'bookmark' : 'bookmark_border'}
                        </span>
                      </button>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-indigo-100 text-sm line-clamp-2 mb-3">{article.summary}</p>
                    <div className="flex items-center gap-3 text-sm text-indigo-100">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {bookmarkedOnly ? 'Bookmarked Articles' : 'Latest Articles'}
          </h2>
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedArticle?.id === article.id
                  ? 'border-indigo-500 dark:border-indigo-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {article.image}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        {article.isTrending && (
                          <span className="text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">trending_up</span>
                            Trending
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{article.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{article.summary}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(article.id);
                      }}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all flex-shrink-0"
                    >
                      <span className={`material-symbols-outlined ${
                        article.isBookmarked
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400'
                      }`}>
                        {article.isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      {article.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {article.readTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                article
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Article Detail */}
        {selectedArticle && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to articles
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getCategoryColor(selectedArticle.category)}`}>
                    {selectedArticle.category}
                  </span>
                  {selectedArticle.isTrending && (
                    <span className="text-sm font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      Trending
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{selectedArticle.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    {selectedArticle.author}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime} read</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Summary</h2>
                <p className="text-indigo-100 text-lg leading-relaxed">{selectedArticle.summary}</p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Full Article</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Source & Attribution</h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p><strong>Source:</strong> {selectedArticle.source}</p>
                  <p><strong>Author:</strong> {selectedArticle.author}</p>
                  <p><strong>Published:</strong> {selectedArticle.date}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span key={idx} className="text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-full font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    selectedArticle.isBookmarked
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {selectedArticle.isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                  {selectedArticle.isBookmarked ? 'Bookmarked' : 'Bookmark Article'}
                </button>
                <button className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">share</span>
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}