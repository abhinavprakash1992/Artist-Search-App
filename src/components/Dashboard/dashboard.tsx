import * as React from 'react';
import { Layout, Tabs } from 'antd';
import { SearchArtist } from '../searchArtist/SearchArtist';
import { Card } from '../../design/card';
import "../../helper/App.scss"
import { SearchAlbums } from '../searchAlbums/searchAlbums';

export class Dashboard extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      artistId: '',
      showAlbum: false,
      showArtist: true,
    }
  }

  render() {
    return (
      <div className={'container'}>
        {
          this.state.showArtist &&
          <Card
            header="Search Artists"
            width="100%"
            headerBgColor={'#483C46'}
            height={"calc(100vh - 93px)"}
            isIcon={false}
          >
            <div style={{ margin: '24px 0px', padding: 24, background: '#fff', minHeight: '75vh' }}>
              <SearchArtist
                albumClicked={(data, index) => { this.setState({ artistId: data['id'], showAlbum: true, showArtist: false }) }}
              />
            </div>
          </Card>
        }
        {this.state.showAlbum &&
          <Card
            header="Search Albums"
            width="100%"
            headerBgColor={'#483C46'}
            height={"calc(100vh - 93px)"}
            isIcon={false}
          >
            <a href='#' onClick={() => { this.setState({ showAlbum: false, showArtist: true }) }}>Back To Artist</a>
            <div style={{ margin: '24px 0px', padding: 24, background: '#fff', minHeight: '75vh' }}>
              <SearchAlbums
                artistId={this.state.artistId}
              />
            </div>
          </Card>}
      </div>
    );
  }
}

interface State {
  artistId: string;
  showAlbum: boolean;
  showArtist: boolean;
}