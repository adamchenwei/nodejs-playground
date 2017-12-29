import React from 'react';
import './App.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class App extends React.Component {
  constructor() {
    super()
    this.state = { files: [] };
    this.onFileDropExecute = this.onFileDropExecute.bind(this);
  }

  onFileDropExecute(acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles, rejectedFiles);
    this.setState({
      files: acceptedFiles,
    });

    const file = acceptedFiles[0];
    let formData = new FormData();
    formData.append('uploads[]', file, file.name);
    // do stuff with files...
    axios({
      method: 'post',
      url: 'http://localhost:3000/upload',
      data: formData,
      // onUploadProgress: (progressEvent) => {
      //   console.log('progress');
      //   console.log(progressEvent);
      // }
    }).then((response) => {
      console.log('successsss!');
      console.log(response);
    }).catch((err) => console.log(err));
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onFileDropExecute}
            name={'uploads[]'}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

<App />

export default App;
