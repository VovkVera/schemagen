
document.addEventListener('DOMContentLoaded', function() {

document.querySelector('#btn_add_field_schema').addEventListener('click', add_field);

document.querySelector('#btn_submit_schema').addEventListener('click', submit_schema);
document.querySelector('#submit_schema_steply').addEventListener('click', submit_schema_name);

var btns_gen_data = document.querySelectorAll('.btn_data_gen_');
for(i=0;i<btns_gen_data.length; i++){
         btns_gen_data[i].addEventListener('click', pre_generator_data);
         }
});

//schema_fields_js

function pre_generator_data() {
    var schema_id = this.id
    var div = document.querySelector('#div_'+schema_id)
    var div_add = document.createElement('div');
        var count_input = document.createElement("INPUT");
        count_input.className = "form-group col-md-1"
        count_input.id =  "count_input_"+ schema_id

        var btn = document.createElement("BUTTON");
        btn.className = "btn btn-outline-primary";
        btn.innerText = '+';
        var name_input = document.createElement("INPUT");
        
        name_input.className = "form-group col-md-2"
        name_input.placeholder = "Name for table"
        name_input.id = "name_input"+schema_id

            div_add.innerHTML =  "";
            div_add.append(name_input)
            div_add.append("  count rows: ")
            div_add.append(count_input)
            div_add.append(" ")
            div_add.append(btn)

        btn.addEventListener('click', () => generation_data(schema_id));
    div.append(div_add)

}

function generation_data(schema_id) {
    count_rows = document.querySelector('#count_input_'+schema_id).value;
    table_name = document.querySelector('#name_input'+schema_id).value;

    fetch('/generation_data', {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
              "schema_id": schema_id,
              "count_rows": count_rows,
              "table_name": table_name
          })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
                    var div = document.querySelector('#div_'+schema_id)
        var btn = document.createElement("BUTTON");
            btn.setAttribute('type', 'submit');
            btn.className = "btn btn-outline-primary";
            btn.innerText = 'Upload';

        div.append(btn)
        //var btn_download = '<input type="file" name="myfile">   <button type="submit">Upload</button>'


        });
}




function element_parsing(element) {

    var name = element.querySelector('#input_name').value;
    var kind =  element.querySelector('#inputType').value;
    var order =  element.querySelector('#input_order').value;

    var data = {
        name: name,
        order:order,
        kind:kind
    }

    return data;

}

function submit_schema_name() {

    var name = document.querySelector('#schema_name_steply').value;

    fetch('/submit_schema_steply', {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
              name: name
          })
        })
        .then(response => response.json())
        .then(result => {
              var data = {
                    name: "",
                    order:"",
                    kind:""
                };
            visualisation_add_column(data, '#fields_steply', 'add' , 'btn_add_field_steply');

            btn = document.querySelector('#btn_add_field_steply')
            btn.addEventListener('click', () => add_field_steply(result.data.id));

            this.style.display = "none";
        });
}

function submit_schema() {
    var name = document.querySelector('#schema_name').value;

    var fields = []

    let rows = document.querySelector('#custom_colums')
    var elementList = rows.querySelectorAll(".form-row");
    elementList.forEach(element =>
        fields.push(element_parsing(element))
     );

    fetch('/submit_schema', {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
              name: name,
              fields: fields
          })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
        });
}


function add_field_steply(schema_id) {
    var name = document.getElementById("fields_steply").querySelector("input[name='input_name']").value;
    var order = document.getElementById("fields_steply").querySelector("input[name='input_order']").value;
    var kind = document.getElementById("fields_steply").querySelector("select[name='inputType']").value;

    var data = {
        name: name,
        order:order,
        kind:kind
    }


    document.getElementById("fields_steply").querySelector("input[name='input_name']").value = '';
    document.getElementById("fields_steply").querySelector("input[name='input_order']").value = '';
    document.getElementById("fields_steply").querySelector("select[name='inputType']").value = '';

    fetch('/add_custom_field/'+ schema_id, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
                name: name,
                order:order,
                kind:kind
          })
        })
        .then(response => response.json())
        .then(result => {
            
            visualisation_add_column(data, '#fields_steply_added', 'delete', 'btn_delete_field_'+result.data.id);
        });


}

function add_field() {

    var name = document.querySelector('#colum_name_new').value;
    var kind =  document.querySelector('#colum_type_new').value;
    var order =  document.querySelector('#colum_order_new').value;

    var data = {
        name: name,
        order:order,
        kind:kind
    }

    document.querySelector('#colum_name_new').value = '';
    document.querySelector('#colum_order_new').value = '';
    visualisation_add_column(data, '#custom_colums', 'delete', 'btn_delete_schema');

}

function visualisation_add_column(column, div_id, btn, btn_id){
    console.log(" column.name: " + column.name)
    rows = document.querySelector(div_id)
        var field = document.createElement('div');
        field.className = 'form-row';
            var div_for_name = document.createElement('div');
                div_for_name.className = 'form-group col-md-6';
                var label = '<label for="input_name"  class="text-black-50 mb-0">Column name</label>';
                var input = '<input type="text" class="form-control" id="input_name" name = "input_name" value="'+ column.name+'">';


        div_for_name.innerHTML = label + input;
        field.append(div_for_name)
            var div_for_type = document.createElement('div');
                div_for_type.className = 'form-group col-md-2';
                label = '<label for="inputType"  class="text-black-50 mb-0">Type</label>'
                var select = document.createElement('select');
                    select.className = 'form-control'
                    select.id = 'inputType'
                    select.name = 'inputType'
                    var option = ''
                    const select_ = document.querySelector('#colum_type_new').getElementsByTagName('option')
                    for (let i = 0; i < select_.length; i++) {
                        option = '<option>'+ select_[i].textContent+'</option>'
                        select.innerHTML += option

                        selected_i = 0;
                        if (select[i].textContent === column.kind)
                         {
                            select[i].setAttribute("selected", "selected");
                         }
                         else{
                            select[i].removeAttribute("selected");
                            }

                    }
            div_for_type.innerHTML = label;
            div_for_type.append(select)
        field.append(div_for_type)

        var div_for_order = document.createElement('div');
                div_for_order.className = 'form-group col-md-2';
                var label = '<label for="input_order"  class="text-black-50 mb-0">Order</label>';
                var input = '<input type="text" class="form-control" id="input_order" name = "input_order" value="'+ column.order+'">';
        div_for_order.innerHTML = label + input;
        field.append(div_for_order)

        var div_for_del = document.createElement('div');
                div_for_del.className = 'form-group col-md-2';
                var label = '<label  class="text-sm-black-50 mb-0"> </label>';
                var btn_del = '<a class="btn btn-outline-primary js-scroll-trigger" id="'+btn_id+'" >'+btn+'</a>';
        div_for_del.innerHTML = label + btn_del;
        field.append(div_for_del)

    rows.append(field)
}


