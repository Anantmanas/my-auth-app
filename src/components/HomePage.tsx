import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface Passenger {
  _id: string;
  name: string;
  airline: {
    name: string;
  };
}

const LazyLoadingPage: React.FC = () => {
  const [data, setData] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${pageSize}`);
        const newData: Passenger[] = response.data.data;
        console.log(newData)
        setData((prevData) => [...prevData, ...newData]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchData();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const currentContainerRef = containerRef.current;

    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, [pageNumber, pageSize]);

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Lazy Loading Page
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Airline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.airline.name}</TableCell>
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

      <Typography variant="h6" align="center" gutterBottom>
        Ordered List
      </Typography>

      {/* <List ref={containerRef}>
        {data.map((item) => (
          <ListItem key={item._id}>
            <ListItemText primary={item.name} secondary={item.airline.name} />
          </ListItem>
        ))}
      </List> */}

    </div>
  );
};

export default LazyLoadingPage;
