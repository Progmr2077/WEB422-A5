import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { ListGroup, Button, Card } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '../lib/userData'; // ADD IMPORT

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // ADD LOADING CHECK (NOTE: The variable name here should likely be searchHistory, not favouritesList)
  if(!searchHistory) return null; // CORRECTED FROM favouritesList TO searchHistory

  const parsedHistory = Array.isArray(searchHistory)
    ? searchHistory.map(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        return Object.fromEntries(entries);
      })
    : [];

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // UPDATE REMOVE FUNCTION TO USE API
  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    try {
      setSearchHistory(await removeFromHistory(searchHistory[index]));
    } catch (err) {
      // Handle error if needed
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      {parsedHistory.length === 0 ? (
          <Card>
              <Card.Body>
                  <h4>Nothing Here</h4>
                  Try searching for some artwork.
              </Card.Body>
          </Card>
      ) : (
          <ListGroup>
              {parsedHistory.map((historyItem, index) => (
          <ListGroup.Item
            key={index}
            className={styles.historyListItem}
            onClick={(e) => historyClicked(e, index)}
          >
            {Object.keys(historyItem).map(key => (
              <span key={key}>
                {key}: <strong>{historyItem[key]}</strong>&nbsp;
              </span>
            ))}
            <Button
              className="float-end"
              variant="danger"
              size="sm"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
    </div>
  );
}