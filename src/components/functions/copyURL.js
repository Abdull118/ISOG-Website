export async function copyURL(currentPromoLink) {
    if (!navigator.clipboard) {
        fallbackCopyURL(currentPromoLink);
        return;
    }
    try {
        await navigator.clipboard.writeText(currentPromoLink);
        console.log('Copying is complete');
    } catch (err) {
        console.error('Copying failed', err);
    }
}

export function fallbackCopyURL(currentPromoLink) {
    var input = document.createElement('input')
    input.setAttribute('value', currentPromoLink)
    document.body.appendChild(input)
    input.focus()
    input.select()
    try {
        document.execCommand('copy')
    } catch (e) {
        console.log(e)
    }
    document.body.removeChild(input)
}