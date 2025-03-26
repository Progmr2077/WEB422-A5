import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
    fetcher
  );

  // Get the favourites list from Jotai state
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // State to control button appearance based on whether the artwork is in favourites
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  // Function to handle adding/removing favourites
  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList(current => current.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  // Set a placeholder image in case primaryImage is not available
  const placeholderImage = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  return (
    <Card>
      {/* Render primaryImage if available, else render placeholder */}
      <Card.Img 
        variant="top" 
        src={data.primaryImage || placeholderImage} 
        alt={data.title || 'Artwork image'} 
      />
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || 'N/A'} <br />
          <strong>Classification:</strong> {data.classification || 'N/A'} <br />
          <strong>Medium:</strong> {data.medium || 'N/A'} <br />
          <br />
          <strong>Artist:</strong>
          {data.artistDisplayName ? (
            <>
              {data.artistDisplayName}{' '}
              <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
            </>
          ) : (
            'N/A'
          )}
          <br />
          <strong>Credit Line:</strong> {data.creditLine || 'N/A'} <br />
          <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
        </Card.Text>
          <Button
          // Add a button to add/remove artwork from favourites
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
      </Card.Body>
    </Card>
  );
}