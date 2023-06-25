export default class RemoveTags {
    removeTags (str) {
        if ((str===null) || (str===''))
        return null;
        else
        str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '');
    }
}