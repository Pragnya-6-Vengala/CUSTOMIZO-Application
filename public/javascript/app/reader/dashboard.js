$(window).on('load', initialize);

const classes = {
    type:{
        cancelled:"table-danger",
        approved: "table-success",
        pending:  "table-warning"
    }
}

let types = {
    approved : {
        label:"Approved",
        isSelected:false
    },
    pending : {
        label:"Wait",
        isSelected:false
    },
    cancelled : {
        label:"Cancel",
        isSelected:false
    }
};

function getSelect(selected){
  let html =  Object.keys(types).map(type => {
        return ` <option ${type == selected ? 'selected="true"' : ""} value="${type}">${types[type].label}</option>`
  }).join('');
  return  `<select class="custom-select status" name="status">${html}</select>`
}

function initialize() {
    let orderDetailsTable = new Table({
        target:'#order-details',
        columns:[
            {title:'S.No'},
            {title:"Requirements"},
            {title:"Time"},
            {title:"Days"},
            {title:"Status"},
        ],
        formatter: formatTableResponse
    })

    function formatTableResponse(data, from=0){
        return data.map(function(row,index){
            return {
                attributes: {
                    id: row._id
                },
                classes:classes.type[row.status],
                data: {
                    Sno:`${(from + (index + 1))}`,
                    ordername: row.requirement.charAt(0).toUpperCase() + row.requirement.slice(1),
                    time: row.time,
                    days: row.days,
                    requirements: row.requirements,
                    status: getSelect(row.status || 'approved'),
                    
                }
            }
        })
    }
    
    orderDetailsTable.render(`/api/app`);
    $('#order-details').on('change','select.status',function(){
        let value = $(this).val();
        let _classes = Object.keys(classes.type).map(e => classes.type[e]).join(' ');
        let _class = classes.type[value] || "";

        let $tr = $(this).parents('tr').first();
        let id = $tr.data('id');
       
        $tr.removeClass(_classes).addClass(_class);

        let data = {
            status: value
        }

        $.ajax({
            url: `/api/app/${id}`,
            method: 'put',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function () {
                Swal.fire(
                    'Success!',
                    'Order status updated successfully.',
                    'success'
                )
            },
            error: function () {
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                );
            }
        })
    })
}






