import React from "react";
import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    z
    // life cycle method
    componentDidMount() {
       this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then(data => {
                const {currencies, totalPages} = data;

                this.setState(
                    {
                        currencies,
                        totalPages,
                        loading: false
                    }
                );
            })
            .catch(error => {
                this.setState(
                    {
                        error: error.errorMessage, loading: false
                    }
                );
            });
    }

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
            return <span>{percent}</span>
        }
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;

        // Increment next page if direction variable is equal to 'mext' otherwise decrement it
        nextPage = direction === 'next' ? nextPage+1 : nextPage - 1;

        this.setState({ page: nextPage }, () => {

            // call fetchCurrencies inside setState's callback

            this.fetchCurrencies();
        }); 
    }

    render() {

        const { loading, error, currencies, page, totalPages } = this.state;

        /** Render only loading component, if loading state is set to true */

        if (loading) {
            return <div className="loading-container"> <Loading /> </div>;
        }

        /** Render only error message, if error occured while fetching data */

        if (error) {
            return <div className="error">{error}</div>
        }

        // props are set by parent component

        return (
            // props: currencies, renderChangePercent
            <div>
                <Table
                    currencies={currencies}
                    renderChangePercent={this.renderChangePercent}
                />

                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        )
    }
}

export default List;
