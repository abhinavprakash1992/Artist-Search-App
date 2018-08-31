import * as React from 'react';
import { Input } from '../../design/Input';
import { Table } from '../../design/table';
import { filter } from 'lodash';
import { Dialog } from '../../design/dialog';
import { Card } from '../../design/card';
import { Button } from '../../design/button';
import { Loading } from '../../design/loading';

export class SearchAlbums extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      albumName: '',
      albumId: '',
      albums: [],
      result: [],
      showDialog: false,
      tracks: [],
      selectedAlbum: '',
      albumReleaseDate: '',
      responseJsonData: null,
      isLoading: false,
    }
  }



  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(`https://www.theaudiodb.com/api/v1/json/1/album.php?i=${this.props.artistId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        const nextState = {
          ...this.state,
        }
        nextState.albums = [];
        nextState.isLoading = false,
          responseJson['album'].forEach((element, index) => {
            const newObject = {
              key: index,
              name: element['strAlbum'],
              id: element['idAlbum'],
              date: element['intYearReleased']
            }
            nextState.albums.push(newObject);
          });
        this.setState(nextState);
      });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ isLoading: true })
    fetch(`https://www.theaudiodb.com/api/v1/json/1/album.php?i=${nextProps.artistId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        const nextState = {
          ...this.state,
        }
        nextState.albums = [];
        nextState.isLoading = false;
        responseJson['album'].forEach((element, index) => {
          const newObject = {
            key: index,
            name: element['strAlbum'],
            id: element['idAlbum'],
            date: element['intYearReleased']
          }
          nextState.albums.push(newObject);
        });
        this.setState(nextState);
      });
  }


  onValueChange = (fieldName: string, value: string, error: any) => {
    const nextState: State = {
      ...this.state,
    }
    nextState.albumName = value;
    if (value === '') {
      fetch(`https://www.theaudiodb.com/api/v1/json/1/album.php?i=${this.props.artistId}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(responseJson => {
          const nextState = {
            ...this.state,
          }
          nextState.albums = [];
          responseJson['album'].forEach((element, index) => {
            const newObject = {
              key: index,
              name: element['strAlbum'],
              id: element['idAlbum'],
              date: element['intYearReleased']
            }
            nextState.albums.push(newObject);
          });
          this.setState(nextState);
        });
    }
    this.setState(nextState);
  }

  searchResult = () => {
    this.setState({ isLoading: true })
    const newData = filter(this.state.albums, (element) => {
      let result = false;
      ['name'].forEach(filter => {
        result = String(element[filter]).toLowerCase().includes(this.state.albumName.toLowerCase());
      });
      return result;
    });

    const nextState: State = {
      ...this.state,
      albumName: this.state.albumName,
    };
    nextState.albums = [];
    nextState.isLoading = false;
    nextState.albums = newData,
      this.setState(nextState);
  }

  getAlbumTracks = (data, index) => {
    this.setState({ isLoading: true })
    fetch(`https://www.theaudiodb.com/api/v1/json/1/track.php?m=${data['id']}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        const nextState = {
          ...this.state
        }
        nextState.tracks = [];
        nextState.isLoading = false;
        responseJson['track'].forEach((element, index) => {
          const newObject = {
            key: index,
            name: element['strTrack'],
            duration: element['intDuration']
          }
          nextState.tracks.push(newObject);
        });
        nextState.albumReleaseDate = data['date']
        nextState.selectedAlbum = data['name']
        nextState.showDialog = true;
        this.setState(nextState);
      });
  }

  render() {
    return (
      <div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '60% auto' }}>
            <Input
              label="Search Albums"
              name="name"
              type="text"
              error={''}
              onChange={this.onValueChange}
            />
            <Button
              icon="search"
              onClick={() => this.searchResult()}
              children="Search"
              bgColor="#ffffff"
              hover
            />
          </div>
          <div style={{ width: '100%', marginTop: 10 }}>
            {this.state.isLoading ?
              <div style={{ marginLeft: 135 }}>
                <Loading />
              </div>
              :
              <Table
                data={this.state.albums}
                columns={['name']}
                hover={true}
                isLink={true}
                onClick={(data, index) => { this.getAlbumTracks(data, index) }}
              />}
          </div>
        </div>
        {this.state.showDialog &&
          <Dialog
            onCloseRequest={() => { this.setState({ showDialog: false }) }}
          >
            <Card
              header={`Track List : ${this.state.selectedAlbum}`}
              width="100%"
              headerBgColor={'#483C46'}
              height={"calc(100vh - 174px)"}
              isIcon={false}
              onDelete={() => { }}
            >
              {`ReleaseDate : ${this.state.albumReleaseDate}`}
              <Table
                data={this.state.tracks}
                columns={['name', 'duration']}
                isLink={false}
              />
            </Card>
          </Dialog>}
      </div>
    );
  }
}

interface State {
  albumName: string;
  albumId: string;
  albums: object[];
  result: object[];
  showDialog: boolean;
  tracks: object[]
  selectedAlbum: string;
  albumReleaseDate: string;
  responseJsonData: any;
  isLoading: boolean;
}

interface Props {
  artistId: string;
}