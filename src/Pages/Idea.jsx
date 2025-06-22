import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getIdeas } from '../Services/api';
import PostCard from '../Components/PostCard';
import Pagination from '../Components/Pagination';
import styles from './Idea.module.css';

const IdeasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = parseInt(searchParams.get('size') || '10', 10);
  const sortBy = searchParams.get('sort') || '-published_at';

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
  };
  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };
  const handlePerPageChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('size', e.target.value);
    params.set('page', '1'); 
    setSearchParams(params);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getIdeas({
          pageNumber: currentPage,
          pageSize: itemsPerPage,
          sort: sortBy,
        });
        setPosts(response.data.data);
        setPagination(response.data.meta);
      } catch (error) {
        console.error("Failed to fetch ideas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage, itemsPerPage, sortBy, setSearchParams]);

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.filterBar}>
        <p className={styles.statusText}>
          {pagination && `Showing ${(pagination.current_page - 1) * pagination.per_page + 1} - ${Math.min(pagination.current_page * pagination.per_page, pagination.total)} of ${pagination.total}`}
        </p>
        <div className={styles.controlsContainer}>
          <select id="per-page" value={itemsPerPage} onChange={handlePerPageChange} className={styles.selectDropdown}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <select id="sort-by" value={sortBy} onChange={handleSortChange} className={styles.selectDropdown}>
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingIndicator}>Loading...</div>
      ) : (
        <div className={styles.postGrid}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className={styles.paginationContainer}>
        {pagination && pagination.last_page > 1 && (
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default IdeasPage;