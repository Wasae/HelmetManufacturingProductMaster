let tag=(function() {
    function tagMarket() {
        return {
            Ofieldset:"<fieldset>",
            Cfieldset:"</fieldset>",
            Olegend:"<legend>",
            Clegend:"</legend>",
            Otable:"<table>",
            Ctable:"</table>",
            OTr:"<tr>",
            CTr:"</tr>",
            OTd:"<td>",
            CTd:"</td>",
            Odiv:"<div>",
            Cdiv:"</div>",
            HR:"<hr>",
            OThead:"<thead>",
            CThead:"</thead>",
            OTh:"<th>",
            CTh:"</th>",
            OTbody:"<tbody>",
            CTbody:"</tbody>"
        }
    }

    return {
        tags:tagMarket
    }
}())

let productsHTML=(function(t) {

    function getEmptyAddProductScreen() {
        let html=""        
        html+=t.Ofieldset
            html+=t.Olegend
            html+="Product"
            html+=t.Clegend
            html+=t.Otable
                html+=t.OTr
                    html+=t.OTd+getLabel("Name")+t.CTd
                    html+=t.OTd+getTextBox({p:"Product Name",v:"",i:"productname"})+t.CTd
                html+=t.CTr
                html+=t.OTr
                    html+=t.OTd+getLabel("Description")+t.CTd
                    html+=t.OTd+getTextBox({p:"Product Description",v:"",i:"productdescription"})+t.CTd
                html+=t.CTr
                html+=t.OTr
                    html+=t.OTd+getLabel("Variations")+t.CTd
                    html+=t.OTd+t.Odiv+formVariation({})+t.Cdiv+getButton()+t.CTd
                html+=t.CTr
            html+=t.Ctable
            html+="<button id='saveProduct'>Save</button>"
            html+="<button id='cancelProduct'>Cancel</button>"
        html+=t.Cfieldset
        return html
    }

    function getPrepopulatedScreen(d) {
        let html=""        
        html+=t.Ofieldset
            html+=t.Olegend
            html+="Product"
            html+=t.Clegend
            html+=t.Otable
                html+=t.OTr
                    html+=t.OTd+getLabel("Name")+t.CTd
                    html+=t.OTd+getTextBox({p:"Product Name",v:d.productname || "",i:"productname"})+t.CTd
                html+=t.CTr
                html+=t.OTr
                    html+=t.OTd+getLabel("Description")+t.CTd
                    html+=t.OTd+getTextBox({p:"Product Description",v:d.description || "",i:"productdescription"})+t.CTd
                html+=t.CTr
                html+=t.OTr
                    html+=t.OTd+getLabel("Variations")+t.CTd
                    if (!d.variations) {
                        html+=t.OTd+t.Odiv+formVariation({})+t.Cdiv+getButton()+t.CTd
                    }
                    else{
                        html+=t.OTd+t.Odiv+
                        d.variations.map(function(d,ix){
                                return formVariation(d)
                        }).join('')+t.Cdiv+getButton()+t.CTd
                    }
                html+=t.CTr
            html+=t.Ctable
            html+="<button id='saveProduct'>Save</button>"
            html+="<button id='cancelProduct'>Cancel</button>"
        html+=t.Cfieldset
        return html
    }

    function formVariation(d) {
        let html=""
            html+=t.Odiv
            html+=t.HR
                html+=t.Otable
                    html+=t.OTr
                        html+=t.OTd+getLabel("Name")+t.CTd
                        html+=t.OTd+getTextBox({p:"Variation Name",v:d.variationname ||"",i:"variationname"})+t.CTd
                    html+=t.CTr
                    html+=t.OTr
                        html+=t.OTd+getLabel("Description")+t.CTd                        
                        html+=t.OTd+getTextBox({p:"Variation Description",v:d.variationdescription || "",i:"variationdescription"})+t.CTd
                        html+=t.OTd+("<button class='btnRemoveVariation'>Remove</button>")+t.CTd
                    html+=t.CTr
                    html+=t.OTr
                        html+=t.OTd+getLabel("Image")+t.CTd
                        html+=t.OTd+getImageControl({i:"variationimage"})+t.CTd                        
                    html+=t.CTr
                html+=t.Ctable
                html+=t.HR
            html+=t.Cdiv            
        return html
    }

    function getAddProductScreen(o) {
        if (o) {
            return getPrepopulatedScreen(o)
        }
        else{
            return getEmptyAddProductScreen()
        }
    }


    function getProductListTable(d) {
        return getFullList(d)
    }

    function getFullList(data) {        
        let html=""
        if (data) {
            html+=t.Otable
                html+=generateTableHeaders()
                html+=generateTableBody(data)
            html+=t.Ctable
        }
        else{
            html+="No Products available"
        }        
        return html
    }

    function generateTableHeaders() {
        let html=""
        html+=t.OThead
            html+=t.OTr
                html+=t.OTh+"#"+t.CTh
                html+=t.OTh+"Name"+t.CTh
                html+=t.OTh+"Description"+t.CTh
                html+=t.OTh+"Action"+t.CTh
            html+=t.CTr
        html+=t.CThead
        return html
    }
    
    function generateTableBody(d) {
        let html=""
        html+=t.OTbody
            html+=d.map((d,ix)=>{
                    let v=""
                        v+=t.OTr
                            v+=t.OTd+(ix+1)+t.CTd
                            v+=t.OTd+(d.productname)+t.CTd
                            v+=t.OTd+(d.productdescription)+t.CTd
                            v+=t.OTd+"<button data-id='"+d.productid+"' class='btnEdit' data-scr='edit'>Edit</button><button data-id='"+d.productid+"' class='btnDelete' data-scr='delete'>Delete</button>"+t.CTd 
                        v+=t.CTr
                    return v
                }).join('')
        html+=t.CTbody
        return html
    }

    function getTextBox(o) {
        return "<input type='textbox' placeholder='"+o.p+"' value='"+o.v+"' data-identifier='"+o.i+"/'>"
    }

    function getLabel(tc){
        return "<label>"+tc+"</label>"
    }

    function getImageControl(o) {
        return "<input type='file' data-identifier='"+o.i+"' />"
    }

    function getButton() {
        return "<button id='btnAddVariation' style='float:right;'>"+"Add"+"</button>"
    }    

    return{
        getHTML:getAddProductScreen,
        getVariation:formVariation,
        getProductListTable:getProductListTable
    }

}(tag.tags()))

let products=(function(p,r){
    let type='click'
    let domReference

    function init() {
        domReference=cacheDOM()
        generateList()
        BindEvents()
    }


    function generateList() {
        // r.GET()
        // .then(r.JSON)
        // .then(function(data){
        //     if (data && data.length) {
        //         domReference.productlisting.innerHTML=p.getProductListTable(d)
        //         BindListEvents()               
        //     }
        //     else{
        //         domReference.productlisting.innerHTML="No Products Found"
        //     }
        // })
        // .catch(function(e){
        //     console.log(e)
        // })        
        let d=[
            {
            productid:1,
            productname:"product1",
            productdescription:"product1 description"
            },
            {
            productid:2,
            productname:"product2",
            productdescription:"product2 description"
            }
        ]        
        domReference.productlisting.innerHTML=p.getProductListTable(d)
        BindListEvents()
    }

    function BindListEvents(){        
        let el=document.getElementsByClassName('btnEdit')
        if (el && el.length) {
            for (let i= 0; i< el.length; i++) {
                el[i].removeEventListener(type,EditProductCLicked)
                el[i].addEventListener(type,EditProductCLicked)
            }
        }
        el=document.getElementsByClassName('btnDelete')
        if (el && el.length) {
            for (let i= 0; i< el.length; i++) {
                el[i].removeEventListener(type,DeleteProductCLicked)
                el[i].addEventListener(type,DeleteProductCLicked)
            }
        }
    }

    function EditProductCLicked() {
        debugger;
        let productid=event.target.attributes["data-id"].value
        if (productid) {                
            // r.GET(,{"productid":productid})
            // .then(r.JSON)
            // .then(function(data) {
            //     if (data) {
            //         btnAddProductClick(data)    
            //     }
            //     else{
            //         alert("Error getting Product Info,Please try again later")
            //     }                
            // })
            // .catch(function(e) {
            //     console.log(e)
            // })
        }
        console.log(productid)
    }

    function DeleteProductCLicked() {        
        if (confirm("do you want to delete this product..??")) {         
            let productid=event.target.attributes["data-id"].value
            // if (productid) {                                
            //     r.GET(,{"productid":productid})
            //     .then(r.JSON)
            //     .then(function(data) {
            //         if (data) {
            //             alert("Product Deleted Successfully")       
            //         }
            //         else{
            //             alert("Error Deleting Product,Please try again")
            //         }
            //     })
            //     .catch(function(e) {
            //         console.log(e)
            //     })
            // }
        }
        return
    }

    function cacheDOM() {
        return{
            btnAddProduct:getElement("btnAddProduct"),
            productlisting:getElement('productlisting'),
            productCRUD:getElement('productCRUD')
        }
    }

    function BindEvents() {
        domReference.btnAddProduct.addEventListener("click",btnAddProductClick)
    }

    function btnAddProductClick() {
        if (arguments[0] && !arguments[0].target) {
            domReference.productCRUD.innerHTML=p.getHTML(arguments[0]) 
        }
        else{
            domReference.productCRUD.innerHTML=p.getHTML() || ""    
        }
        
        BindOnVariations()
        Elementshowhide(domReference.productlisting,"none")
        Elementshowhide(domReference.productCRUD,"")
    }    

    function getElement(id) {
        return document.getElementById(id)
    }

    function Elementshowhide(el,val) {
        if (el && el.style) {
            el.style.display=val
        }
    }

    function BindOnVariations() {
        let el=getElement('btnAddVariation')
        if (el) {
            el.removeEventListener(type,AddVariationsClicked)
            el.addEventListener(type,AddVariationsClicked)
        }
        el=getElement('saveProduct')
        if (el) {
            el.removeEventListener(type,SaveProductClicked)
            el.addEventListener(type,SaveProductClicked)
        }        
        el=getElement('cancelProduct')
        if (el) {
            el.removeEventListener(type,cancelProductClicked)
            el.addEventListener(type,cancelProductClicked)
        }
        el=document.getElementsByClassName('btnRemoveVariation')
        for (let i = 0; i < el.length; i++) {
            el[i].removeEventListener(type,btnRemoveVariationClicked)
            el[i].addEventListener(type,btnRemoveVariationClicked)
        }
    }

    function AddVariationsClicked(){
        var parentOfvariation=event.target.previousElementSibling
        event.target.previousElementSibling.appendChild(new DOMParser().parseFromString(p.getVariation(),"text/html").body.firstElementChild)
        BindOnVariations()
    }

    function btnRemoveVariationClicked() {
        if (confirm("do you want to delete this variation..??")) {
            event.target.closest('div').remove()   
        }
        return
    }

    function cancelProductClicked() {
        Elementshowhide(domReference.productlisting,"")
        Elementshowhide(domReference.productCRUD,"none")
        generateList()
    }

    function SaveProductClicked() {
        let product={}
        let trs=event.target.previousElementSibling.querySelectorAll('tr')
        if (trs && trs.length!=0) {
            product.productname=trs[0].querySelectorAll('input')[0].value
            product.productdescription=trs[1].querySelectorAll('input')[0].value
            product.variations=[]
            let table=trs[2].querySelectorAll('table')
            for (let j = 0; j < table.length; j++) {
                let input=table[j].querySelectorAll('input')
                let v={}                
                v.variationname=input[0].value
                v.variationdescription=input[1].value
                v.variationimage=""
                product.variations.push(v)
            }
        }

        if (product) {
            // r.POST(,{"product":product})
            // .then(r.JSON)
            // .then(function(d) {
            //     if(d){
            //         alert("Product Saved Successfully")
            //     }else{
            //         alert("Error Saving Product,Please try again")
            //     }
            // })
            // .catch(function(e) {
            //    console.log(e) 
            // })
        }
        console.log(product)
    }

    return{
        init:init
    }
}(productsHTML,requestModule))