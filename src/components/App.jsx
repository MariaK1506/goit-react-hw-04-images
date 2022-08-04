import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
    error: null,
    showModal: false,
    largeImage: {},
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchQuery;
    const nextSearch = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      if (nextPage === 1) {
        this.setState({ images: [] });
      }

      this.renderGallery();
    }
  }

  renderGallery = () => {
    const { searchQuery, page } = this.state;
    Api(searchQuery, page)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          status: 'resolved',
        }));

        if (data.hits.length === 0) {
          this.setState({
            status: 'rejected',
            error:
              'Sorry, there are no images matching your search query. Please try again.',
          });
        }
        this.scroll();
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handleFormSubmit = searchQuery => {
    /* передаем стейт формы в App */

    this.setState({ searchQuery, page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openImage = largeImage => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { error, status, images, showModal, largeImage } = this.state;
    const needShowHelloMessage =
      status !== 'rejected' && status !== 'pending' && images.length === 0;
    // console.log(error);

    return (
      <WrapperContainer>
        <AppWrapper>
          <GlobalStyle />
          <Searchbar onSubmit={this.handleFormSubmit} />

          {status === 'pending' && <Loader />}
          {status === 'rejected' && <Error message={error} />}
          {status === 'resolved' && (
            <ImageGallery images={images} onImageClick={this.openImage} />
          )}

          {needShowHelloMessage && (
            <HelloMessage>What do you want to look for?</HelloMessage>
          )}

          {images.length !== 0 && <Button onClick={this.loadMore} />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImage.largeImageURL} alt={largeImage.tags} />
            </Modal>
          )}

          <ToastContainer position="top-center" autoClose={3000} />
        </AppWrapper>
      </WrapperContainer>
    );
  }
}
