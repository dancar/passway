import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Form, FormGroup, InputGroup, Button, Checkbox, FormControl} from 'react-bootstrap'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropboxOn: this.props.dropboxOn
    }
  }

  render = () => {
    return (
      <div>
        <h4> Settings </h4>
          <Checkbox
            checked={ this.state.dropboxOn }
            onChange={ (e) => this.setState({dropboxOn: e.target.checked}) }
            >Sync to Dropbox </Checkbox>
          { this.state.dropboxOn && (
            <table style={ {width: '100%', margin: 'auto', background: 'none'} }>
              <tbody>
              <tr>
                <td>
                <FormControl
                  type="text"
                  value={ this.state.dropboxAccessToken }
                  onChange={ e => this.handleDropboxOnChange(e.target.value) }
                  placeholder="Dropbox Acces Token"
                  />
                </td>
                <td style={ {textAlign: "center" } }>
                  <Button>Save </Button>
                  </td>
              </tr>
              <tr>
                <td style={ { paddingTop: '20px' } }>
                  <a target="_new" href={ this.props.dropboxAuthLink } > Get Access Key </a>
                </td>
              </tr>
              </tbody>
            </table>
            )
          }


      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    settings: state.settings,
    dropboxAuthLink: state.dropbox.authUrl
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
