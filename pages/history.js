import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { ListGroup, Button, Card } from 'react-bootstrap';
import styles from '@/styles/History.module.css';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Ensure searchHistory is always an array
  const parsedHistory = Array.isArray(searchHistory)
    ? searchHistory.map(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        return Object.fromEntries(entries);
      })
    : [];

  // Function to handle a click on a search history item
  const historyClicked = (e, index) => {
    e.stopPropagation(); // Prevent event from bubbling
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Function to remove a search history item
  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // Prevent event from bubbling
    setSearchHistory(current => {
      let updatedHistory = [...current];
      updatedHistory.splice(index, 1);
      return updatedHistory;
    });
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