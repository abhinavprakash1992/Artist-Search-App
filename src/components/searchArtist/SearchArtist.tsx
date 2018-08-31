import * as React from 'react';
import { Input } from '../../design/Input';
import { Table } from '../../design/table';
import { Button } from '../../design/button';
import { Loading } from '../../design/loading';

export class SearchArtist extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      artistName: '',
      artists: [],
      isLoading: false
    }
  }

  onValueChange = (fieldName: string, value: string, error: any) => {
    const nextState: State = {
      ...this.state,
    }
    nextState.artistName = value;
    this.setState(nextState);
  }

  searchResult = () => {
    this.setState({ isLoading: true })
    fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${this.state.artistName}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        const nextState = {
          ...this.state,
        }
        nextState.artists = [];
        nextState.isLoading = false;
        responseJson['artists'].forEach((element, index) => {
          const newObject = {
            key: index,
            name: element['strArtist'],
            id: element['idArtist']
          }
          nextState.artists.push(newObject);
        });
        this.setState(nextState);
      });
  }

  render() {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '60% auto' }}>
          <Input
            label="Search Artist"
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
          <div>
            {this.state.isLoading ?
              <div style={{ marginLeft: 135 }}>
                <Loading />
              </div>
              :
              <Table
                data={this.state.artists}
                columns={['name']}
                hover={true}
                isLink={true}
                onClick={(data, index) => { this.props.albumClicked(data, index) }}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

interface State {
  artistName: string;
  artists: object[];
  isLoading: boolean;
}

interface Props {
  albumClicked: (data, index) => void;
}