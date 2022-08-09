import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from './GlobalStyle';
import Api from '../services/images-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Error from './Error/Error';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { AppWrapper, HelloMessage } from './App.styled';
import { WrapperContainer } from './Container/Container.styled';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState({});

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    if (searchQuery) {
      setStatus('pending');
      if (page === 1) {
        setImages([]);
      }
      renderGallery();
    }
    if (page > 1) {
      scroll();
    }

    function renderGallery() {
      Api(searchQuery, page)
        .then(data => {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setStatus('resolved');

          if (data.hits.length === 0) {
            setError(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            setStatus('rejected');
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    /* передаем стейт формы в App */
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    //
  };

  const scroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const openImage = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const needShowHelloMessage =
    status !== 'rejected' && status !== 'pending' && images.length === 0;

  return (
    <WrapperContainer>
      <AppWrapper>
        <GlobalStyle />
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'pending' && <Loader />}
        {status === 'rejected' && <Error message={error} />}
        {status === 'resolved' && (
          <ImageGallery images={images} onImageClick={openImage} />
        )}

        {needShowHelloMessage && (
          <HelloMessage>What do you want to look for?</HelloMessage>
        )}

        {status === 'resolved' && images.length !== 0 && (
          <Button onClick={loadMore} />
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImage.largeImageURL} alt={largeImage.tags} />
          </Modal>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </AppWrapper>
    </WrapperContainer>
  );
}

// export class OldApp extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     images: [],
//     status: 'idle',
//     error: null,
//     showModal: false,
//     largeImage: {},
//   };

// componentDidUpdate(_, prevState) {
//   const prevSearch = prevState.searchQuery;
//   const nextSearch = this.state.searchQuery;
//   const prevPage = prevState.page;
//   const nextPage = this.state.page;

//   if (prevSearch !== nextSearch || prevPage !== nextPage) {
//     this.setState({ status: 'pending' });

//     if (nextPage === 1) {
//       this.setState({ images: [] });
//     }

//     this.renderGallery();
//   }

//   if (nextPage > 1) {
//     this.scroll();
//   }
// }

// renderGallery = () => {
//   const { searchQuery, page } = this.state;
//   Api(searchQuery, page)
//     .then(data => {
//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//         status: 'resolved',
//       }));

//       if (data.hits.length === 0) {
//         this.setState({
//           status: 'rejected',
//           error:
//             'Sorry, there are no images matching your search query. Please try again.',
//         });
//       }
//     })
//     .catch(error => this.setState({ error, status: 'rejected' }));
// };

// const handleFormSubmit = searchQuery => {
//   /* передаем стейт формы в App */
//   setSearchQuery(searchQuery)
//   setPage(1)

// };

// toggleModal = () => {
//   this.setState(({ showModal }) => ({ showModal: !showModal }));
// };

// loadMore = () => {
//   this.setState(prevState => ({ page: prevState.page + 1 }));
// };

// const loadMore = () => {
//   setPage((prevPage) => prevPage + 1);
// };

// openImage = largeImage => {
//   this.setState({ largeImage });
//   this.toggleModal();
// };

// const needShowHelloMessage =
//   status !== 'rejected' && status !== 'pending' && images.length === 0;
// console.log(error);
