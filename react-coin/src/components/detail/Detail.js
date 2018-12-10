import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import { handleResponse, renderChangePercent } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            currency: {},
            loading: false,
            error: null
        };
    }
    componentDidMount() {
        // 'Component has been mounted'

        const currencyId = this.props.match.params.id;

        this.setState({ loading: true });
        this.fetchCurrency(currencyId);

    }

    componentWillReceiveProps(nextProps) {
        // 'Component has been updated'

        if (this.props.location.pathname !== nextProps.location.pathname) {

            // Get new currency id from url
            const newCurrencyId = nextProps.match.params.id;

            this.fetchCurrency(newCurrencyId);
        }
    }

    fetchCurrency(currencyId) {
        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then((currency) => {
                this.setState({
                    loading: false,
                    error: null,
                    currency
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.errorMessage,
                });
            })

    }

    render() {
        const { loading, error, currency } = this.state;

        // Render loading component if initial state is set to true

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        // Render error message error occur while fetching data

        if (error) {
            return <div className="error"> {error}</div>
        }

        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.id} ({currency.symbol})
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currency.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{currency.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H Change <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market cap</span>
                        <span className="Detail-dollar">$</span> {currency.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24H Volume</span>
                        <span className="Detail-dollar">$</span> {currency.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total supply</span>
                        <span className="Detail-dollar"></span> {currency.totalSupply}
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;