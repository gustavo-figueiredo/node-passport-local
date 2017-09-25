import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input, Button, Checkbox, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import validateEmails from '../utils/validateEmails';

const formFields = [
  { label: 'Email', name: 'email', icon: 'mail' },
  { label: 'Password', name: 'password', icon: 'privacy' },
  { label: 'Confirm password', name: 'passwordConfirm', icon: 'privacy' },
];

const SignupField = ({ input, label, icon, meta: { error, touched } }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Input icon={icon} iconPosition='left' {...input} />

      <Message
        error
        visible={!!(touched && error)}
        content={error}
      />
    </Form.Field>
  );
};


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false }

  }
  renderFields() {
    return _.map(formFields, ({ label, name, icon }) => {
      return (
        <Field
          key={name}
          component={SignupField}
          type="text"
          label={label}
          name={name}
          icon={icon}
        />
      );
    });
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column>
          <Form onSubmit={this.props.handleSubmit(onSubmit)}>
            {this.renderFields()}
            <Checkbox label='Check this box' onChange={() => this.setState({checked: !this.state.checked})} checked={this.state.checked} />
            <Button positive type="submit">
              Submit
          </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

onSubmit = () => {
  console.log('on submit', this.state);
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'signupForm',
  destroyOnUnmount: true
})(Signup);