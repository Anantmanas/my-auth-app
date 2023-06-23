import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, TablePagination } from '@mui/material';

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
  const [airlineData, setAirlineData] = useState<Passenger['airline'][0][]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${rowsPerPage}`);
      const json = await response.json();
      const newData: Passenger[] = json.data;
  
      const updatedData = newData.map((passenger) => {
        const airlineData = passenger.airline[0];
        return {
          ...passenger,
          airline: airlineData,
        };
      });
  
      setData((prevData: Passenger[]) => [...prevData, ...updatedData] as Passenger[]);

      setLoading(false);
      setAirlineData((prevAirlineData) => [...prevAirlineData, ...updatedData.map((item) => item.airline)]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
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
  }, [pageNumber]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const startIndex = pageNumber * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
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
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{airlineData[index]?.name}</TableCell>
                <TableCell>
                  <Avatar alt={airlineData[index]?.name} src={airlineData[index]?.logo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 20, 30]}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={pageNumber}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default LazyLoadingPage;
