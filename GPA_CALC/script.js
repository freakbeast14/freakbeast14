function processData(form) {
    var eefm=eval(form.eefm.value);
    var wcc=eval(form.wcc.value);
    var pe1=eval(form.pe1.value);
    var pe2=eval(form.pe2.value);
    var es=eval(form.es.value);

    var eslab=eval(form.eslab.value);
    var nslab=eval(form.nslab.value);
    var madlab=eval(form.madlab.value);

    var res=eval(grade(total(form, eefm))*3 + grade(total(form, wcc))*4 + grade(total(form, pe1))*3 + grade(total(form, pe2))*3 + grade(total(form, es))*3 + grade(eslab)*2 + grade(nslab) + grade(madlab)*2);
    form.gpa.value = eval(res/21);

    form.geefm.value=eval(grade(total(form, eefm)));
    form.gwcc.value=eval(grade(total(form, wcc)));
    form.ges.value=eval(grade(total(form, es)));
    form.gpe1.value=eval(grade(total(form, pe1)));
    form.gpe2.value=eval(grade(total(form, pe2)));
    form.geslab.value=eval(grade(eslab));
    form.gnslab.value=eval(grade(nslab));
    form.gmadlab.value=eval(grade(madlab));

    console.log(total(form, eefm),total(form, wcc),total(form, es),total(form, pe1),total(form, pe2));
}
function total(form, internals){
var pgpa=eval(form.pgpa.value);
return eval(internals*1.5+pgpa*2.5);
}
function grade(marks){
if (marks > 89) {
    return 10;
} 
else if (marks > 79) {
    return 9;
} 
else if (marks > 69) {
    return 8;
} 
else if (marks > 59) {
    return 7;
} 
else if (marks > 59) {
    return 6;
} 
else if (marks > 49) {
    return 5;
} 
else{
    return 0;
}
}