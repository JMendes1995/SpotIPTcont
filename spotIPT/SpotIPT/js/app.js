
document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/assets/xml/discot.xml');

    xhr.onload = function (e) {

        if (xhr.status == 200) {
            //input que seleciona os cds
            var bt = document.createElement('input');
            document.body.appendChild(bt);
            //break line
            var brs = document.createElement('br');
            document.body.appendChild(brs);

            var discotecaData = xhr.responseXML.documentElement;

                selectCD("", discotecaData);

                 bt.addEventListener('input', function (evt) {
                     var cdInput = evt.srcElement.value;
                     var getVar = document.getElementsByTagName('div');
                     //remove o div onde contem todos os albuns
                     getVar[1].remove();
                     //volta para selecionar novos Cds
                     selectCD(cdInput, discotecaData);
                });

        }
    }
    xhr.onerror = function (e) {
        console.error('ERROR!!!', e);

    };
    xhr.send();

    function selectCD(cdInput, discotecaData){
        var albuns 
       //caso a barra de search esteja vazia seleciona todos os cds
        if (cdInput === "") {
           albuns = discotecaData.querySelectorAll('cd');
        } else {
           albuns = discotecaData.querySelectorAll('cd[titulo*="' + cdInput + '"]');
 
        }
        //div conteirner onde contem todos os albuns
        var conteiner = document.createElement('div');
        document.body.appendChild(conteiner);
        conteiner.className = 'albunsContainer';

        albuns = Array.from(albuns);


        albuns.forEach((itemCD) => {
            //div  que vai conter as infoCds o input e as Faixas
            var alb = document.createElement('div');
            alb.className = 'album';
            conteiner.appendChild(alb);
            //div infoCds onde vai conter todas as informacoes relativas ao album
            var infoCds = document.createElement('div');
            infoCds.className='infoCds'
            alb.appendChild(infoCds);
                    //---------------capas----------------
            var capas = itemCD.getElementsByTagName('capa');
                    //corvert htmlCollection on array
                    capas = Array.from(capas);

                    capas.forEach((itemCapa) => {
                        var imgNode = document.createElement('img');
                        var img = itemCapa.attributes[0].textContent;
                        imgNode.setAttribute('src', '/assets/images/' + img);
                        infoCds.appendChild(imgNode);
                    });
                    //-------------tituloAlbum--------------------
                    let nodetit = document.createElement('h1');
                    var tit = itemCD.attributes[0].textContent;
                    nodetit.textContent = tit;
                    infoCds.appendChild(nodetit);

                    //----------------autor--------------------
                    let node = document.createElement('p');
                    var autor = itemCD.attributes[1].textContent;
                    node.textContent = 'Autor: ' + autor;
                    infoCds.appendChild(node);

                    //-----------------data--------------------
                    var datas = itemCD.getElementsByTagName('data');
                    //corvert htmlCollection on array
                    datas = Array.from(datas);
                    datas.forEach((item) => {

                        var nodeData = document.createElement('p');
      
                        var ano = item.getAttribute('ano');
                        var mes = item.getAttribute('mes');
                        var dia = item.getAttribute('dia');

                        nodeData.textContent = ano+'-'+mes+'-'+dia;
                        infoCds.appendChild(nodeData);
                    });
                    //-------------editora---------------------
                    var nodeEdit = document.createElement('p');
                    var editor = itemCD.attributes[2].textContent;
                    nodeEdit.textContent = 'Editora: '+ editor;
            infoCds.appendChild(nodeEdit);

            //--------------faixas----------------------    
            let btFaixa = document.createElement('input');
            alb.appendChild(btFaixa);
            //div que contem todas as faixas
            var nodeFaixas = document.createElement('div');
            alb.appendChild(nodeFaixas);
            nodeFaixas.className = 'Faixas'      
            //funcao responsavel por gerar as faixas
            getFaixa(itemCD, nodeFaixas, btFaixa);

           
        });

    }


    function getFaixa(itemCD, nodeFaixas, btFaixa) {
        //
        selecFX("", itemCD, nodeFaixas);
        btFaixa.addEventListener('input', function (evt) {
            //remove o div que diz respeito as faixas
            var getVar = nodeFaixas.getElementsByTagName('div');
            getVar[0].remove();
            var s = evt.srcElement.value;
            //envia o conteudo do input 
            selecFX(s, itemCD, nodeFaixas);
        });
    }
    //---------------------------------------------------------------
    // funcao responsavel por escolher e mostra as faixas pretendidas
    //---------------------------------------------------------------
    function selecFX(evt, itemCD, nodeFaixas) {
            var faixas;
                //caso a barra search esteja vazia seleciona todas as faxas do ficheiro XML
                if (evt === "") {
                    faixas = itemCD.querySelectorAll('faixa');
                } else {
                    //seleciona as faixas consoante o que foi inserido na barra de search 
                    faixas = itemCD.querySelectorAll('faixa[ref*="' + evt + '"]');
                }

                //criar o div em que vai ser introduzido as faixas
                var boxFaixas = document.createElement('div');
                nodeFaixas.appendChild(boxFaixas);
                boxFaixas.className = 'faixas';
        
                faixas = Array.from(faixas);

                faixas.forEach((itemLista) => {
                        
                    let nodeFaixas = document.createElement('li');
                    var showFaixa = itemLista.attributes[1].textContent;
                    nodeFaixas.textContent = showFaixa;
                    boxFaixas.appendChild(nodeFaixas);

                });


            }
        }    
    
);

