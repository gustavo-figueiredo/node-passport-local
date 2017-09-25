import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        componentWillMount() {
            if (!this.props.auth) {
                this.context.router.history.push('/login');
               // this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.auth) {
                //this.context.router.push('/login');
                this.context.router.history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {... this.props} />
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth };
    }

    return connect(mapStateToProps)(Authentication);
}