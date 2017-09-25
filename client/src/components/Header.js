import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Menu, Image } from 'semantic-ui-react';

import { Grid } from 'semantic-ui-react';
//import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <Menu.Item as={Link} key="1" to="/login">Login</Menu.Item>,
          <Menu.Item as={Link} key="2" to="/signup">Signup</Menu.Item>
        ];
      default:
        return [
          <Menu.Item as='a'>Home</Menu.Item>,

              <Dropdown item simple text='Dropdown'>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Header Item</Dropdown.Header>
                  <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Submenu</span>
                    <Dropdown.Menu>
                      <Dropdown.Item>List Item</Dropdown.Item>
                      <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        ];
    }
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column>
          <Menu inverted>
            <Container>
              <Menu.Item as={Link} to="/" header>
                <Image
                  size='mini'
                  src='/logo.png'
                  style={{ marginRight: '1.5em' }}
                />
                Admin
        </Menu.Item>
      {this.renderContent()}
            </Container>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
