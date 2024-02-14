export function OpenCountry({
  openData,
  onHandleBack,
  setError,
  setIsLoading,
  setCountries,
  setIsOpened,
}) {
  // console.log(data);
  // console.log(openData);

  async function getBorderCountry(code) {
    setIsLoading(true);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}
`);

      const data = await res.json();

      const countriesData = data.map((data) => ({
        name: data.name?.common,
        officialName: data.name?.official,
        population: data.population,
        capital: data.capital,
        flag: data.flags.png,
        region: data.region,
      }));
      setCountries(countriesData);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleBorderCnt(code) {
    setIsOpened(false);
    getBorderCountry(code);
  }
  return (
    <div className="open-country">
      <form className="back--btn">
        <button className="btn-back" onClick={onHandleBack}>
          &larr; Back
        </button>
      </form>

      <ul className="info-contry">
        {openData.map((dta) => (
          <OpenCountryList
            name={dta.name}
            population={dta.population}
            flag={dta.flag}
            region={dta.region}
            borders={dta.borders}
            nativeName={dta.nativeName}
            tld={dta.tld}
            currency={dta.currency}
            languages={dta.languages}
            capital={dta.capital}
            key={dta.name}
            onHandleBorerCnt={handleBorderCnt}
          />
        ))}
      </ul>
    </div>
  );
}

function OpenCountryList({
  name,
  flag,
  population,
  region,
  subregion,
  borders,
  nativeName,
  tld,
  capital,
  currency,
  languages,
  onHandleBorerCnt,
}) {
  function addCommasToNumber(number) {
    let numberString = number.toString();

    let parts = numberString.split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  }
  // console.log(flag);
  return (
    <>
      <div>
        <img src={flag} className="country_flag" alt="country flag" />
      </div>
      <div className="info--country">
        <div className="country__info">
          <h2 className="name " style={{ fontSize: "20px", marginTop: "40px" }}>
            {name}
          </h2>

          <div className="listed-shi">
            <ul className="native-det">
              <li>
                <span>Native Name:</span>
                {/* {nativeName} */}
                {Object.values(nativeName)[0].common}
              </li>

              <li>
                <span>Population:</span>
                {addCommasToNumber(population)}
              </li>

              <li>
                <span>Region:</span>
                {region}
              </li>
              {subregion && (
                <li>
                  <span>Sub Region:</span>
                  {subregion}
                </li>
              )}

              <li>
                <span>Capital:</span>
                {capital}
              </li>
            </ul>

            <ul className="native-det">
              <li>
                <span>Top Level Domain:</span>
                {tld}
              </li>
              <li>
                <span>Currencies:</span>
                {currency}
              </li>
              <li>
                <span>Languages:</span>
                {languages}
              </li>
            </ul>
          </div>
          <p className="border-names">Border Countries:</p>
          <ul className="border-countries">
            {/* {borders} */}

            {borders?.map((border) => (
              <li key={border} onClick={() => onHandleBorerCnt(border)}>
                {border}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
