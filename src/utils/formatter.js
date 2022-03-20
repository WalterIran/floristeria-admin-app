import "intl";
import "intl/locale-data/jsonp/en";

export const formatter = new Intl.NumberFormat('eM-US', {
    style: 'currency',
    currency: 'USD'
});