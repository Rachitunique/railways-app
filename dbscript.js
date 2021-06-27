let dbAccess;
//let container = document.querySelector(".container");
let request=indexedDB.open("Railway",1);
request.addEventListener("success",function(){
    dbAccess=request.result;
});
request.addEventListener("upgradeneeded",function(){
    let db=request.result;
    db.createObjectStore("trains",{keyPath: "mId" });
});

request.addEventListener("error",function(){
    alert("some error occured");
});
//addTrain(v0,v1,v2,v3,v4);
function addTrain(v0,v1,v2,v3,v4,v5){
    let tx=dbAccess.transaction("trains","readwrite");
    let trainObjectStore=tx.objectStore("trains");
    let data={
        mId: Date.now(),
        v0: v0,
        v1: v1,
        v2: v2,
        v3: v3,
        v4: v4,
        v5: v5,
    };
    trainObjectStore.add(data);
}


//view train on relie.html or employee's page
function viewt(table){
    let tx=dbAccess.transaction("trains","readonly");
    let trainObjectStore=tx.objectStore("trains");
    let req = trainObjectStore.openCursor();
    req.addEventListener("success" , function(){
        let cursor = req.result;
        if(cursor){
            let tr = document.createElement("tr");
            let v0 = cursor.value.v0;
            let v1 = cursor.value.v1;
            let v2 = cursor.value.v2;
            let v3 = cursor.value.v3;
            let v4 = cursor.value.v4;
            let v5 = cursor.value.v5;
            for(let i=0; i<6; i++){
                let td = document.createElement("td");
                td.classList.add("cll1");
                if(i == 0){
                    td.innerHTML = v0;
                    td.classList.add("inew");
                    if(td.innerText == "Fast"){
                        td.style.background = "red"; 
                    }
                    else if(td.innerText == "Medium"){
                        td.style.background = "orange"; 
                    }
                    else if(td.innerText == "Slow"){
                        td.style.background = "yellow"; 
                    }
                }
                else if(i == 1){
                    td.innerHTML = v1;
                    td.classList.add("cllll");
                }
                else if(i == 2){
                    td.innerHTML = v2;
                }
                else if(i == 3){
                    td.innerHTML = v3;
                }
                else if(i == 4){
                    td.innerHTML = v4;
                }
                else if(i == 5){
                    td.innerHTML = v5;
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
            //tr.setAttribute("class","del");
            tr.addEventListener("click",function(e){
                if(tr.classList.contains("active")){
                    tr.classList.remove("active");
                    tr.style.background = "none";
                }
                else{
                    tr.classList.add("active");
                    tr.style.background = "orange";
                }
            })
            cursor.continue();
        }
    })
}


//to delete train
function DeleteTrain(kk){
    let tx=dbAccess.transaction("trains","readwrite");
    let trainObjectStore=tx.objectStore("trains");
    let req = trainObjectStore.openCursor();
    req.addEventListener("success" , function(){
        let cursor = req.result;
        if(cursor){
            let v1 = cursor.value.v1;
            let mId = cursor.value.mId;
            for(let i=0; i<kk.length; i++){
                if(v1 == kk[i]){
                    trainObjectStore.delete(Number(mId));
                }
            }
            cursor.continue();
        }
    })
}

//this function yields the train information for which we are inquiring in customer.html
function getTrain(cl1){
    let contain = document.querySelector(".container1");
    let tx=dbAccess.transaction("trains","readonly");
    let trainObjectStore=tx.objectStore("trains");
    let req = trainObjectStore.openCursor();
    req.addEventListener("success" , function(){
        let cursor = req.result;
        if(cursor){
            let v1 = cursor.value.v1;
            if(v1 == cl1){
                let v0 = cursor.value.v0;
                let v2 = cursor.value.v2;
                let v3 = cursor.value.v3;
                let v4 = cursor.value.v4;
                let v5 = cursor.value.v5;
                let modal = document.createElement("div");
                modal.setAttribute("class","enquimodal");
                let x0 = document.createElement("div");
                x0.setAttribute("class","x0");
                x0.classList.add("inew");
                x0.innerText = v0;
                if(v0 == "Fast"){
                    x0.style.background = "red"; 
                }
                else if(v0 == "Medium"){
                    x0.style.background = "orange"; 
                }
                else if(v0 == "Slow"){
                    x0.style.background = "yellow"; 
                }
                let x1 = document.createElement("div");
                x1.setAttribute("class","x1");
                x1.innerText = "Train No. :"+v1;
                let x2 = document.createElement("div");
                x2.setAttribute("class","x2");
                x2.innerText = "Time: "+v2;
                let x3 = document.createElement("div");
                x3.setAttribute("class","x3");
                x3.innerText = "From: "+v3;
                let x4 = document.createElement("div");
                x4.setAttribute("class","x4");
                x4.innerText = "To: "+v4;
                let x5 = document.createElement("div");
                x5.setAttribute("class","x5");
                x5.innerText = "Seats: "+v5;
                let x6 = document.createElement("button");
                x6.setAttribute("class","x6");
                x6.innerText = "End";
                modal.append(x0);
                modal.append(x1);
                modal.append(x2);
                modal.append(x3);
                modal.append(x4);
                modal.append(x5);
                modal.append(x6);
                contain.append(modal);
                x6.addEventListener("click",function(){
                    modal.remove();
                })
            }
            cursor.continue();
        }
    })
}


//when we click on book train this function yields the train according to our preferred speed and source and destination places from the database
function booTrain(cl1,cl2,cl3){
    let contain = document.querySelector(".container1");
    let tx=dbAccess.transaction("trains","readwrite");
    let trainObjectStore=tx.objectStore("trains");
    let req = trainObjectStore.openCursor();
    req.addEventListener("success" , function(){
        let cursor = req.result;
        if(cursor){
            let v0 = cursor.value.v0;
            let v3 = cursor.value.v3;
            let v4 = cursor.value.v4;
            let mId = cursor.value.mId;
            if(v0 == cl1 && v3 == cl2 && v4 == cl3){
                let v1 = cursor.value.v1;
                let v2 = cursor.value.v2;
                let v3 = cursor.value.v3;
                let v4 = cursor.value.v4;
                let v5 = cursor.value.v5;
                let modal = document.createElement("div");
                modal.setAttribute("class","enquimodal1");
                let x0 = document.createElement("div");
                x0.setAttribute("class","x01");
                x0.classList.add("inew");
                x0.innerText = v0;
                if(v0 == "Fast"){
                    x0.style.background = "red"; 
                }
                else if(v0 == "Medium"){
                    x0.style.background = "orange"; 
                }
                else if(v0 == "Slow"){
                    x0.style.background = "yellow"; 
                }
                let x1 = document.createElement("div");
                x1.setAttribute("class","x11");
                x1.innerText = "Train no: "+v1;
                let x2 = document.createElement("div");
                x2.setAttribute("class","x21");
                x2.innerText = "D&T: "+v2;
                let x3 = document.createElement("div");
                x3.setAttribute("class","x31");
                x3.innerText = "From: "+v3;
                let x4 = document.createElement("div");
                x4.setAttribute("class","x41");
                x4.innerText = "To: "+v4;
                let x5 = document.createElement("div");
                x5.setAttribute("class","x51");
                x5.innerText = "Seats: "+v5;
                let x6 = document.createElement("button");
                x6.setAttribute("class","x61");
                x6.innerText = "Book";
                modal.append(x0);
                modal.append(x1);
                modal.append(x2);
                modal.append(x3);
                modal.append(x4);
                modal.append(x5);
                modal.append(x6);
                contain.append(modal);
                let m = [];
                m.push(v1);
                x6.addEventListener("click",function(){
                    console.log(m);
                    DeleteTrain(m);
                    let k = Number(v5)-1;
                    no = String(k);
                    addTrain(v0,v1,v2,v3,v4,no);
                    x5.innerText = "Seats: "+no;
                    alert("Now seats available in Train "+v1+" is "+no);
                    bookbox(v0,v1);               
                })
            }
            cursor.continue();
        }
    })
}

//when we click on any one of the appeared train for booking than this function yields the box asking for customer's details
function bookbox(v0,v1){
    let contain = document.querySelector(".container1");
    let lll = document.createElement("div");
    lll.setAttribute("class","mm");
    lll.innerHTML = `
        <div class="head1">
            Railway
        </div>
        <div class="l1">
            <label for="uname"><b>Enter Name  :</b></label>
            <input class="ll1" type="text" placeholder="Enter name" name="uname" required>
        </div>
        <div class="l2">
            <label for="uname"><b>Enter Age  :</b></label>
            <input class="ll2" type="text" placeholder="Enter age" name="uname" required>
        </div>
        <div class="l3">
            <label for="uname"><b>Choose Comp.  :</b></label>
            <input class="ll3" type="text" placeholder="AC/Non Ac" name="uname" required>
        </div>
        <div class="l4">
            <label for="uname"><b>Enter seats  :</b></label>
            <input class="ll4" type="text" placeholder="seats to book" name="uname" required> 
        </div>
        <div class="l5">
            <button class="sub1" type="submit">Payement</button> 
        </div>
    `
    contain.append(lll);
    let l5 = document.querySelector(".sub1");
    l5.addEventListener("click",function(){
        let we1 = document.querySelector(".ll1");
        let we2 = document.querySelector(".ll2");
        let we3 = document.querySelector(".ll3");
        let we4 = document.querySelector(".ll4");
        lll.remove();
        let pay = document.createElement("div");
        pay.setAttribute("class","payement");
        pay.innerHTML=`
        <div class="head2">
            Payment
        </div>
        <div class="l1">
            <label for="train5">Choose Card  :</label>
            <select class="train5" name="card">
                <option class = "s" value="credit">Credit</option>
                <option class = "s" value="debit">Debit</option>
                <option class = "s" value="online Walet">Walet</option>
            </select>
        </div>
        <div class="l2">
            <label for="uname"><b>Card Number  :</b></label>
            <input type="text" placeholder="1111222221345" name="uname" required>
        </div>
        <div class="l3">
            <label for="uname"><b>Exp. month  :</b></label>
            <input type="text" placeholder="Month" name="uname" required>
        </div>
        <div class="l4">
            <label for="uname"><b>CVV  :</b></label>
            <input type="text" placeholder="125" name="uname" required> 
        </div>
        <div class="l5">
            <button class="sub2" type="submit">Generate ticket</button> 
        </div>
        `
        contain.append(pay);
        let l51 = document.querySelector(".sub2");
        l51.addEventListener("click",function(){
            pay.remove();
            generate(v0,v1,we1.value,we2.value,we3.value,we4.value,contain);
        })
    })
}


//this function generates the ticket for the user after he has done payement , this ticket can also be downloaded
function generate(v0,v1,v2,v3,v4,v5,contain){
    let modal = document.createElement("div");
    modal.setAttribute("class","xxx1");
    let d0 = document.createElement("div");
    d0.setAttribute("class","dd10");
    d0.innerText = "Rail Ticket";
    let d1 = document.createElement("div");
    d1.setAttribute("class","dd11");
    d1.innerText = "Speed: " + v0;
    let d2 = document.createElement("div");
    d2.setAttribute("class","dd12");
    d2.innerText = "Train Name: " + v1;
    let d3 = document.createElement("div");
    d3.setAttribute("class","dd13");
    d3.innerText = "Person name: "+v2;
    let d4 = document.createElement("div");
    d4.setAttribute("class","dd14");
    d4.innerText = "Person Age: "+v3;
    let d5 = document.createElement("div");
    d5.setAttribute("class","dd15");
    d5.innerText = "Compartment: "+v4;
    let d6 = document.createElement("div");
    d6.setAttribute("class","dd16");
    d6.innerText = "Seats: "+v5;
    let d7 = document.createElement("button");
    d7.setAttribute("class","dd17");
    d7.innerText = "Download";
    let d8 = document.createElement("button");
    d8.setAttribute("class","dd18");
    d8.innerText = "End";
    modal.append(d0)
    modal.append(d1);
    modal.append(d2);
    modal.append(d3);
    modal.append(d4);
    modal.append(d5);
    modal.append(d6);
    modal.append(d7);
    modal.append(d8);
    contain.append(modal);
    d7.addEventListener("click",function(){
        let a = document.createElement("a");
        a.href = `data:application/json,${encodeURIComponent(JSON.stringify(modal))}`;
        a.download = "ticket.json";
        contain.append(a);
        alert("File Sucessfully downloaded and attached to your container");
        a.click();
    });
    d8.addEventListener("click",function(){
        modal.remove();
    })
}


//this function works when we click on cancel page and yield the train which we had booked
function viewbooked(){
    let container1 = document.querySelector(".container1");
    let tx=dbAccess.transaction("trains","readwrite");
    let trainObjectStore=tx.objectStore("trains");
    let req = trainObjectStore.openCursor();
    let l2 = false;
    req.addEventListener("success" , function(){
        let cursor = req.result;
        if(cursor){
            let v5 = cursor.value.v5;
            let mId = cursor.value.mId;
            if(v5 < 100){
                let v0 = cursor.value.v0;
                let v1 = cursor.value.v1;
                let v2 = cursor.value.v2;
                let v3 = cursor.value.v3;
                let v4 = cursor.value.v4;
                if(l2 == false){
                    let d111 = document.createElement("div");
                    d111.setAttribute("class","table");
                    table = document.createElement("table");
                    table.setAttribute("class","tab");
                    let tr = document.createElement("tr");
                    let th1 = document.createElement("th");
                    th1.innerText = "Speed"
                    let th2 = document.createElement("th");
                    th2.innerText = "Train No."
                    let th3 = document.createElement("th");
                    th3.innerText = "Date&Time"
                    let th4 = document.createElement("th");
                    th4.innerText = "From";
                    let th5 = document.createElement("th");
                    th5.innerText = "To";
                    let th6 = document.createElement("th");
                    th6.innerText = "Seats Booked";
                    let th7 = document.createElement("th");
                    th7.innerText = "No. of seats to cancel";
                    let th8 = document.createElement("th");
                    th8.innerText = "Confirm";
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
                    tr.appendChild(th4);
                    tr.appendChild(th5);
                    tr.appendChild(th6);
                    tr.appendChild(th7);
                    tr.appendChild(th8);
                    tr.setAttribute("class","hehe");
                    table.appendChild(tr);
                    d111.append(table);
                    container1.append(d111);
                    l2 = true;
                    sub(v1,v2,v3,v4,v5,v0,table);
                }
                else{
                    sub(v1,v2,v3,v4,v5,v0,table);
                }
            }
            cursor.continue();
        }
    })
}


//it inserts contents in the table generated by the viewbooked()
function sub(v1,v2,v3,v4,v5,v0,table){
    let tr = document.createElement("tr");
    for(let i=0; i<8; i++){
        let td = document.createElement("td");
        td.classList.add("cll1");
        if(i == 0){
            td.innerHTML = v0;
            td.classList.add("inew");
            if(td.innerText == "Fast"){
                td.style.background = "red"; 
            }
            else if(td.innerText == "Medium"){
                td.style.background = "orange"; 
            }
            else if(td.innerText == "Slow"){
                td.style.background = "yellow"; 
            }
        }
        else if(i == 1){
            td.innerHTML = v1;
            td.classList.add("cllll");
        }
        else if(i == 2){
            td.innerHTML = v2;
        }
        else if(i == 3){
            td.innerHTML = v3;
        }
        else if(i == 4){
            td.innerHTML = v4;
        }
        else if(i == 5){
            let n = Number(v5);
            di = 100-n;
            let s = String(di);
            td.innerText = s;
        }
        else if(i == 6){
            let o = document.createElement("input");
            o.setAttribute('type', 'text');
            o.setAttribute("class","bookedseats");
            td.append(o);
        }
        else if(i == 7){
            let o = document.createElement("button");
            o.setAttribute("class","confirmation");
            o.innerText = "OK";
            td.append(o);
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //tr.setAttribute("class","del");
    tr.addEventListener("click",function(e){
        if(tr.classList.contains("active")){
            tr.classList.remove("active");
            tr.style.background = "none";
        }
        else{
            tr.classList.add("active");
            tr.style.background = "orange";
        }
    })
    let r = document.querySelector(".confirmation");
    r.addEventListener("click",function(){
        //no of seats to cancel
        let i1 = document.querySelector(".bookedseats");
        //Train no.
        let i2 = document.querySelector(".cllll");
        //no of seats to cancel ka value selected
        let io1 = i1.value;
        //Train no ka value selected
        let io2 = i2.innerText;
        //updated in database
        update(io1,io2);
    })
}


//when we cancel the ticket than it is furthur updated on the database as the booked ticket decreses so the seat present in that perticular train in the database increases
function update(io1,io2){
    let tx=dbAccess.transaction("trains","readwrite");
    let trainObjectStore=tx.objectStore("trains");
    let req = trainObjectStore.openCursor();
    req.addEventListener("success" , function(){
        let cursor = req.result;
        if(cursor){
            let v1 = cursor.value.v1;
            let mId = cursor.value.mId;
            if(v1 == io2){
                let v0 = cursor.value.v0;
                let v2 = cursor.value.v2;
                let v3 = cursor.value.v3;
                let v4 = cursor.value.v4;
                let v5 = cursor.value.v5;
                let m = [];
                m.push(v1);
                DeleteTrain(m);
                let o1 = Number(v5);
                let o2 = Number(io1);
                let s = o1+o2;
                let s1 = String(s);
                addTrain(v0,v1,v2,v3,v4,s1);
            }
            cursor.continue();
        }
    })
}
