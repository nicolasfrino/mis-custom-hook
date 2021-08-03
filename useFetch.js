import  { useEffect, useState, useRef } from 'react'

export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null,  loading:true, error:null})

    useEffect(() => {
        return () => {
            isMounted.current=false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null,  loading:true, error:null})

        fetch(url)
            .then (resp => resp.json()
            .then(data => {

                //setTimeout( () => {

                    if (isMounted.current)
                    {
                        setState({
                            loading:false,
                            erro: null,
                            data
                        })
                        console.log('Componente montado');
                    }
                    else{
                        console.log('Componente no montado');
                    }
                //}
                
                //,4000);


            })
            .catch( () => {
                setState({ data: null,  loading:false, error:'No se puede cargar'})
            })
            );
    }, [url])

    return state;
}
