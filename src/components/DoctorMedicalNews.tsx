import React, { useState, useEffect } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

interface NewsArticle {
  id: number;
  category: string;
  categoryColor: string;
  type: string;
  title: string;
  description: string;
  author?: string;
  authorImage?: string;
  date: string;
  readTime: string;
  thumbnail: string;
  thumbnailBg: string;
  icon: string;
  iconColor: string;
  isBookmarked?: boolean;
}

export function DoctorMedicalNews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedContent, setSelectedContent] = useState('All Content');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([2]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [liveArticles, setLiveArticles] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<'latest' | 'trending' | 'regional' | 'specialty'>('latest');

  const sanitizeText = (input?: string) => {
    if (!input) return '';
    return input
      .replace(/<[^>]*>/g, ' ')
      .replace(/href\s*=\s*["'][^"']*["']/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const extractImageUrl = (item: any): string => {
    const fromKnownFields =
      item?.thumbnail ||
      item?.enclosure?.link ||
      item?.image ||
      item?.media?.content ||
      item?.mediaContent ||
      '';

    if (typeof fromKnownFields === 'string' && /^https?:\/\//i.test(fromKnownFields)) {
      return fromKnownFields;
    }

    const htmlSource = `${item?.description || ''} ${item?.content || ''}`;
    const imgMatch = htmlSource.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch?.[1] && /^https?:\/\//i.test(imgMatch[1])) {
      return imgMatch[1];
    }

    return 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
  };

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      category: 'Cardiology',
      categoryColor: 'text-blue-600',
      type: 'Research Article',
      title: 'Comparative Efficacy of Novel Anticoagulants in Post-Op Patients',
      description:
        'A multicenter study involving 5,000 patients reveals new insights into the safety profiles of Factor Xa inhibitors versus traditional warfarin therapy in postoperative recovery settings.',
      author: 'Dr. R. Brown et al.',
      authorImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB_E0sX2linXYSy7eR073nGPxa2JkqMMMe67QkmD_ITi71vp-IHghipUsd-jHz9UjbUp-ZMe00-TAjXlKs-aLHU4hLAD3YGSiWsiFpE5w6NFTkSt0Q6jvZyj_X51Fk80jUG7fl6e_mpsfawnCAWoi2oqP4y3RP0pEYLwBhRlMMZU3NUF-skAAPjtkqPZ4IeyU9xA-R15xB7Ce-RW6DC13OIq5R6RUfR8GxcMTDNP30WPUIpb9QHe5rsSJ9gifwLYlbIfmHGy5rVpZFE',
      date: 'Nov 12, 2024',
      readTime: '8 min read',
      thumbnail: '',
      thumbnailBg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'cardiology',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      category: 'Pharmacology',
      categoryColor: 'text-emerald-600',
      type: 'FDA Approval',
      title: "FDA Approves New Treatment for Early-Stage Alzheimer's",
      description:
        'The new monoclonal antibody treatment has been shown to slow cognitive decline by 35% in early-stage trials. Full prescribing information and box warnings included.',
      author: 'Medical Journal Review',
      authorImage: '',
      date: 'Nov 10, 2024',
      readTime: '5 min read',
      thumbnail: '',
      thumbnailBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      icon: 'medication',
      iconColor: 'text-emerald-600',
      isBookmarked: true,
    },
    {
      id: 3,
      category: 'Neurology',
      categoryColor: 'text-indigo-600',
      type: 'Case Study',
      title: 'Rare Presentation of Guillain-Barré Syndrome: A Case Report',
      description:
        'Detailed analysis of atypical symptoms in a 45-year-old female patient, highlighting the importance of early differential diagnosis in emergency settings.',
      author: 'Dr. S. Miller',
      authorImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDwD8u-Wd3jqmM6mbnjyYJDKWXNxFPuFv0OiHH-6Z008EmNH2cjQ4dKYCuUIJXxepvE--OCjZjMTTIOubY29mnnBFpnTOhFNmP1X2Nd-E_UvK7_hx0qahTtlpKr7CVl0f06Edp8VXiNdbDMje3JuiVr5anJgY7bA582v9lORmPPumi9765rxzg0eCu6CF1X5JzBPW4UzxI5tN3m4CZAOBwwI2morE6zMg6uMlHi726IExCBInLkfx9HHmtX_Y3OH2r9bsI8QpmUDgiu',
      date: 'Nov 08, 2024',
      readTime: '12 min read',
      thumbnail: '',
      thumbnailBg: 'bg-indigo-50 dark:bg-indigo-900/20',
      icon: 'psychology',
      iconColor: 'text-indigo-600',
    },
    {
      id: 4,
      category: 'Policy',
      categoryColor: 'text-orange-600',
      type: 'Regional Update',
      title: 'New Telehealth Reimbursement Policies Effective Jan 1st',
      description:
        "The CMS has released the final rule for next year's physician fee schedule, including permanent expansion of certain telehealth codes and updated RVUs.",
      author: 'Healthcare Admin News',
      authorImage: '',
      date: 'Nov 05, 2024',
      readTime: '4 min read',
      thumbnail: '',
      thumbnailBg: 'bg-orange-50 dark:bg-orange-900/20',
      icon: 'policy',
      iconColor: 'text-orange-600',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {

    const mapLiveItemToArticle = (item: any, index: number): NewsArticle => {
      const title = sanitizeText(item?.title) || 'Medical update';
      const description =
        sanitizeText(item?.description) ||
        sanitizeText(item?.snippet) ||
        sanitizeText(item?.content) ||
        'Open article to read full details.';
      const publishedAt = item?.pubDate || item?.publishedAt || item?.published || '';
      const source = sanitizeText(item?.source?.name || item?.source || item?.creator || 'Live Source');
      const image = extractImageUrl(item);

      return {
        id: 1000 + index,
        category: 'Healthcare',
        categoryColor: 'text-blue-600',
        type: 'Live Update',
        title,
        description,
        author: source,
        authorImage: '',
        date: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Today',
        readTime: '3 min read',
        thumbnail: image,
        thumbnailBg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'medical_services',
        iconColor: 'text-blue-600',
      };
    };

    const fetchLiveNews = async () => {
      setIsLoadingNews(true);
      setNewsError('');

      try {
        const specialtyToken = selectedSpecialty !== 'All Specialties' ? selectedSpecialty : '';
        const contentToken = selectedContent !== 'All Content' ? selectedContent : '';
        const quickFilterToken =
          activeQuickFilter === 'trending'
            ? 'trending'
            : activeQuickFilter === 'regional'
            ? 'north america'
            : activeQuickFilter === 'specialty'
            ? specialtyToken || 'healthcare'
            : '';
        const queryTokens = [debouncedSearchQuery || 'healthcare', specialtyToken, contentToken, quickFilterToken]
          .filter(Boolean)
          .join(' ');

        const rssQueryVariants = [
          `${queryTokens} medical when:7d`,
          `${queryTokens} healthcare`,
          `${queryTokens}`,
          `healthcare ${debouncedSearchQuery}`.trim(),
        ].filter(Boolean);

        for (const variant of rssQueryVariants) {
          const googleNewsRssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
            variant
          )}&hl=en-IN&gl=IN&ceid=IN:en`;
          const rssResponse = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
              googleNewsRssUrl
            )}&count=30&_=${Date.now()}`
          );
          if (!rssResponse.ok) continue;
          const rssData = await rssResponse.json();
          const rssItems = rssData?.items || [];
          if (Array.isArray(rssItems) && rssItems.length > 0) {
            setLiveArticles(rssItems.slice(0, 20).map(mapLiveItemToArticle));
            return;
          }
        }

        throw new Error('No live news items found');
      } catch {
        setNewsError('Live news could not be loaded right now.');
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchLiveNews();
  }, [debouncedSearchQuery, selectedSpecialty, selectedContent, activeQuickFilter]);

  const baseArticles = liveArticles.length > 0 ? liveArticles : newsArticles;
  const displayedArticles = baseArticles.filter((article) => {
    const haystack = `${article.title} ${article.description} ${article.author || ''}`.toLowerCase();
    const matchesSearch = debouncedSearchQuery ? haystack.includes(debouncedSearchQuery.toLowerCase()) : true;
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || haystack.includes(selectedSpecialty.toLowerCase());
    const matchesContent = selectedContent === 'All Content' || haystack.includes(selectedContent.toLowerCase());
    const matchesQuickFilter =
      activeQuickFilter === 'latest'
        ? true
        : activeQuickFilter === 'trending'
        ? haystack.includes('trend') || haystack.includes('breakthrough') || haystack.includes('new')
        : activeQuickFilter === 'regional'
        ? haystack.includes('north america') || haystack.includes('usa') || haystack.includes('canada')
        : specialtyTokenMatch(haystack, selectedSpecialty);
    return matchesSearch && matchesSpecialty && matchesContent && matchesQuickFilter;
  });
  const featuredArticle = displayedArticles[0] || baseArticles[0];
  const clinicalAlertArticle = displayedArticles[1] || baseArticles[1];
  const cmeArticle = displayedArticles[2] || baseArticles[2];

  const toggleBookmark = (articleId: number) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  function specialtyTokenMatch(haystack: string, specialty: string) {
    if (specialty === 'All Specialties') return true;
    return haystack.includes(specialty.toLowerCase());
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white/50 dark:bg-slate-950 relative h-full overflow-y-auto">
      {/* Header - Consistent Style */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              newspaper
            </span>
          </div>
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Medical News</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Latest research, articles, and medical updates</p>
          </div>
        </div>
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Bookmarks */}
          <button className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[24px]">bookmarks</span>
          </button>
          {/* Notification Bell */}
          <NotificationIcon 
            showDot={true}
            onClick={() => setShowNotifications(!showNotifications)}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-5">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Page Header */}
          <div className="flex items-center justify-end mb-0">
            <button className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm hover:shadow hover:border-blue-600/50 transition-all group">
              <span className="material-symbols-outlined text-blue-600 text-[16px]">tune</span>
              <span className="text-xs font-medium text-slate-900 dark:text-white">
                Customize
              </span>
            </button>
          </div>

          {/* Featured Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-96">
            {/* Main Featured Article */}
            <article className="md:col-span-8 relative rounded-2xl overflow-hidden group shadow-lg cursor-pointer h-80 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              <div
                className="absolute inset-0 bg-blue-900 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${featuredArticle?.thumbnail || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"}')`,
                }}
              ></div>
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full md:w-3/4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    Breakthrough
                  </span>
                  <span className="text-gray-300 text-xs font-medium">• 2 hours ago</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-blue-500">
                  {featuredArticle?.title || 'Live healthcare news'}
                </h3>
                <p className="text-gray-200 text-sm md:text-base line-clamp-2">
                  {featuredArticle?.description || 'Latest healthcare developments from live global sources.'}
                </p>
              </div>
            </article>

            {/* Side Cards */}
            <div className="md:col-span-4 flex flex-col gap-6 h-full">
              {/* Clinical Alert Card */}
              <article className="relative flex-1 rounded-2xl overflow-hidden group shadow-md cursor-pointer bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 flex flex-col justify-between hover:border-blue-600/30 transition-colors">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2 block">
                    Clinical Alert
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {clinicalAlertArticle?.title || 'Clinical healthcare update'}
                  </h4>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img
                        alt="Author"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm8xGZTJ0jezpmraz2Gyh4jujiZT_FRnAhDUNJpoqKnjLjsZubwZAew57trMA9TxJEWc4sN_xEpnrHAkLxfE_7B64h01McEasNHwG3weTEnACQxRi1hxuktbXo5pQpwvv4kYcj2XDp9zwT_NNK3oqAidMsy95_sgEHS8zRALRVF3_5S2ObQskrBTQsUvAuKmuOtSBqZSq2IvXuxOUUYrYW7okfzIaiIE7AfNTpsfzUN7gh-yHgSNeASGaEb7hmV6jnps0u6n0OhXwp"
                      />
                    </div>
                    <span className="text-xs text-slate-500">{clinicalAlertArticle?.author || 'Live Source'}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500 text-[20px]">
                    arrow_forward
                  </span>
                </div>
              </article>

              {/* CME Card */}
              <article className="relative flex-1 rounded-2xl overflow-hidden group shadow-md cursor-pointer bg-blue-600 text-white p-5 flex flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-700">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl">event_note</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wide mb-2 block">
                    Upcoming CME
                  </span>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    {cmeArticle?.title || 'Global healthcare highlights'}
                  </h4>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs font-medium bg-white/10 w-fit px-2 py-1 rounded backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  {cmeArticle?.date || 'Live'}
                </div>
              </article>
            </div>
          </div>

          {isLoadingNews ? (
            <p className="text-xs text-slate-500 px-1">Loading live healthcare news...</p>
          ) : newsError ? (
            <p className="text-xs text-amber-600 px-1">{newsError} Showing cached articles.</p>
          ) : (
            <p className="text-xs text-emerald-600 px-1">Live healthcare news loaded.</p>
          )}

          {/* Search and Filters Section */}
          <div className="sticky top-16 z-10 -mx-4 px-4 md:-mx-8 md:px-8 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-2 flex flex-col md:flex-row gap-3">
              {/* Search Input */}
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border-none rounded-lg focus:ring-2 focus:ring-blue-600/20 text-sm outline-none"
                  placeholder="Search articles, authors, or keywords..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto">
                <select
                  className="bg-slate-50 dark:bg-slate-700/50 border-none rounded-lg text-sm font-medium text-slate-500 px-3 py-2.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 focus:ring-0 min-w-[140px]"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option>All Specialties</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Oncology</option>
                  <option>Pediatrics</option>
                </select>
                <select
                  className="bg-slate-50 dark:bg-slate-700/50 border-none rounded-lg text-sm font-medium text-slate-500 px-3 py-2.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 focus:ring-0 min-w-[120px]"
                  value={selectedContent}
                  onChange={(e) => setSelectedContent(e.target.value)}
                >
                  <option>All Content</option>
                  <option>Clinical Trials</option>
                  <option>Case Studies</option>
                  <option>Protocols</option>
                  <option>Policy</option>
                </select>
                <button className="flex items-center justify-center size-10 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveQuickFilter('latest')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeQuickFilter === 'latest'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                Latest News
              </button>
              <button
                onClick={() => setActiveQuickFilter('trending')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeQuickFilter === 'trending'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveQuickFilter('regional')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeQuickFilter === 'regional'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                Regional: North America
              </button>
              <button
                onClick={() => setActiveQuickFilter('specialty')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeQuickFilter === 'specialty'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                My Specialty
              </button>
            </div>
          </div>

          {/* News Articles List */}
          <div className="flex flex-col gap-4">
            {displayedArticles.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-sm text-slate-500">
                No matching live medical news found. Try another search keyword.
              </div>
            ) : null}
            {displayedArticles.map((article) => {
              const isBookmarked = bookmarkedArticles.includes(article.id);

              return (
                <article
                  key={article.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all group"
                >
                  {/* Thumbnail */}
                  <div className={`w-full sm:w-48 h-48 sm:h-32 rounded-lg ${article.thumbnailBg} shrink-0 overflow-hidden relative`}>
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div className={`absolute inset-0 ${article.thumbnailBg}`}></div>
                        <span className={`material-symbols-outlined ${article.iconColor} text-5xl relative z-10`}>
                          {article.icon}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Type */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-bold ${article.categoryColor} uppercase tracking-wider`}
                        >
                          {article.category}
                        </span>
                        <span className="size-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs text-slate-500">{article.type}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight line-clamp-2 break-words group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                        {article.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-1">
                      <div className="flex items-center gap-3">
                        {/* Author */}
                        {article.authorImage && (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="size-5 rounded-full bg-slate-200 overflow-hidden">
                                <img
                                  className="w-full h-full object-cover"
                                  src={article.authorImage}
                                  alt={article.author}
                                />
                              </div>
                              <span className="text-xs font-medium text-slate-900 dark:text-slate-300">
                                {article.author}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">|</span>
                          </>
                        )}
                        {!article.authorImage && article.author && (
                          <>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-300">
                              {article.author}
                            </span>
                            <span className="text-xs text-slate-500">|</span>
                          </>
                        )}
                        <span className="text-xs text-slate-500">{article.date}</span>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          • {article.readTime}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleBookmark(article.id)}
                          className={`p-1 rounded transition-colors ${
                            isBookmarked
                              ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                              : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isBookmarked ? 'filled' : ''
                            }`}
                            style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
                          >
                            bookmark
                          </span>
                        </button>
                        <button className="text-slate-500 hover:text-blue-600 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          <span className="material-symbols-outlined text-[20px]">share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="flex items-center justify-center py-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-bold text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all">
              Load More Articles
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
}