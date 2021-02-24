import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

const AlbumList = ({albums}) => {
  return (
    <div id="album-list">
      {albums.map((album) => {
        return (
          <Link key={album.id} className="album" to={'/album/' + album.id}>
            <img className="album-img" src={album.cover_medium} alt={album.title} />
            <span className="album-name">{album.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default AlbumList;
