function processData(form) {
  var eefm = eval(form.eefm.value);
  var wcc = eval(form.wcc.value);
  var pe1 = eval(form.pe1.value);
  var pe2 = eval(form.pe2.value);
  var es = eval(form.es.value);

  var eslab = eval(form.eslab.value);
  var nslab = eval(form.nslab.value);
  var madlab = eval(form.madlab.value);

  var res = eval(
    points(total(form, eefm)) * 3 +
      points(total(form, wcc)) * 4 +
      points(total(form, pe1)) * 3 +
      points(total(form, pe2)) * 3 +
      points(total(form, es)) * 3 +
      points(eslab) * 2 +
      points(nslab) +
      points(madlab) * 2
  );
  form.gpa.value = eval(res / 21).toFixed(2);

  form.geefm.value = grade(points(total(form, eefm)));
  form.gwcc.value = grade(points(total(form, wcc)));
  form.ges.value = grade(points(total(form, es)));
  form.gpe1.value = grade(points(total(form, pe1)));
  form.gpe2.value = grade(points(total(form, pe2)));
  form.geslab.value = grade(points(eslab));
  form.gnslab.value = grade(points(nslab));
  form.gmadlab.value = grade(points(madlab));
}
function total(form, internals) {
  var pgpa = eval(form.pgpa.value);
  return eval(internals * 1.5 + pgpa * 2.5);
}
function points(marks) {
  if (marks > 89) {
    return 10;
  } else if (marks > 79) {
    return 9;
  } else if (marks > 69) {
    return 8;
  } else if (marks > 59) {
    return 7;
  } else if (marks > 59) {
    return 6;
  } else if (marks > 49) {
    return 5;
  } else {
    return 0;
  }
}
function grade(points) {
  if (points == 10) {
    return "A+";
  } else if (points == 9) {
    return "A";
  } else if (points == 8) {
    return "B";
  } else if (points == 7) {
    return "C";
  } else if (points == 6) {
    return "D";
  } else if (points == 5) {
    return "E";
  } else {
    return "F";
  }
}



