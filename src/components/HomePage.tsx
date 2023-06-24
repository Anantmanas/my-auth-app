import React, { useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from '@mui/material';

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: {
    _id: string;
    id: number;
    name: string;
    country: string;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
  }[];
}

const LazyLoadingPage: React.FC = () => {
  const [data, setData] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const fetchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }

      fetchTimeoutRef.current = window.setTimeout(() => {
        const container = containerRef.current;
        if (container) {
          const { scrollTop, clientHeight, scrollHeight } = container;
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            loadMoreData();
          }
        }
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=20`
      );
      const json = await response.json();
      const newData: Passenger[] = json.data;

      setData((prevData: Passenger[]) => [...prevData, ...newData]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      if (json.page === json.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    if (!loading && hasMore) {
      fetchData();
    }
  };



  const displayedData = data;

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Lazy Loading Page
      </Typography>

      <TableContainer ref={containerRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Passenger Details</TableCell>
              <TableCell>Airline Details</TableCell>
              <TableCell>Airline Logo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {displayedData.map((item, index) => (
              <TableRow key={`${item._id}_${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.airline[0]?.name}</TableCell>
                <TableCell>
                  <Avatar alt={item.airline[0]?.name} src={item.airline[0]?.logo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default LazyLoadingPage;
