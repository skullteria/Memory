import React from "react";
import PropTypes from "prop-types";

const CounterComponent = ({
  onGetDomainClick,
  counter,
  domain,
  domains,
  onDomainChange
}) => (
  <form onSubmit={onGetDomainClick}>
    <i>{counter}</i>
    <input type="text" value={domain} onChange={onDomainChange} />
    <button>Drück Mich</button>
    <ul>
      {(!domains.length && "no results found") ||
        domains.map((e, i) => <li key={i}>{e}</li>)}
    </ul>
  </form>
);

CounterComponent.propTypes = {
  counter: PropTypes.number.isRequired
};

CounterComponent.defaultProps = {
  counter: 0,
  domains: []
};

export default CounterComponent;
