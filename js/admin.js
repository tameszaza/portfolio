(function () {
  'use strict';

  const categoryLabels = {
    projects: 'Projects',
    awards: 'Awards',
    activities: 'Activities'
  };

  const state = {
    data: null,
    originalData: null,
    category: 'projects',
    selectedId: null,
    editingNew: false,
    draft: null,
    dirty: false
  };

  const dom = {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    dom.categoryButtons = Array.from(document.querySelectorAll('[data-category]'));
    dom.recordList = document.getElementById('recordList');
    dom.addItemBtn = document.getElementById('addItemBtn');
    dom.editorTitle = document.getElementById('editorTitle');
    dom.editorBody = document.getElementById('editorBody');
    dom.statusLine = document.getElementById('statusLine');
    dom.listTitle = document.getElementById('listTitle');
    dom.importFile = document.getElementById('importFile');
    dom.exportBtn = document.getElementById('exportBtn');
    dom.resetBtn = document.getElementById('resetBtn');

    dom.categoryButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setCategory(btn.getAttribute('data-category'));
      });
    });

    if (dom.addItemBtn) dom.addItemBtn.addEventListener('click', handleAddNew);
    if (dom.exportBtn) dom.exportBtn.addEventListener('click', handleExport);
    if (dom.resetBtn) dom.resetBtn.addEventListener('click', handleReset);
    if (dom.importFile) dom.importFile.addEventListener('change', handleImport);

    setActiveCategoryButton();
    setStatus('Loading content...');
    loadContent();
  }

  function loadContent() {
    fetch('data/content.json', { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        state.data = sanitiseContent(data);
        state.originalData = clone(state.data);
        state.selectedId = null;
        state.editingNew = false;
        state.draft = null;
        state.dirty = false;
        renderAll();
        setStatus('Loaded content.json');
      })
      .catch(function (error) {
        console.error('Failed to load admin content', error);
        setStatus('Failed to load content.json. Check that the file exists and is accessible.', 'error');
        if (dom.recordList) {
          dom.recordList.innerHTML = '<div class="list-group-item text-danger">Unable to load data.</div>';
        }
      });
  }

  function sanitiseContent(data) {
    const safe = data && typeof data === 'object' ? data : {};
    const modalDetails = safe.modalDetails && typeof safe.modalDetails === 'object' ? safe.modalDetails : {};
    const projectCards = Array.isArray(safe.projectCards) ? safe.projectCards : [];
    const activityDetails = safe.activityDetails && typeof safe.activityDetails === 'object' ? safe.activityDetails : {};
    const activityOrderRaw = Array.isArray(safe.activityOrder) ? safe.activityOrder : Object.keys(activityDetails);
    const activityOrder = activityOrderRaw.filter(function (id) { return !!activityDetails[id]; });
    const awardsCards = Array.isArray(safe.awardsCards) ? safe.awardsCards : [];

    return {
      modalDetails: modalDetails,
      projectCards: projectCards,
      activityDetails: activityDetails,
      activityOrder: activityOrder,
      awardsCards: awardsCards
    };
  }

  function renderAll() {
    updateListTitle();
    renderList();
    renderEditor();
  }

  function setCategory(category) {
    if (!categoryLabels.hasOwnProperty(category)) return;
    state.category = category;
    state.selectedId = null;
    state.editingNew = false;
    state.draft = null;
    setActiveCategoryButton();
    updateListTitle();
    renderList();
    renderEditor();
  }

  function setActiveCategoryButton() {
    dom.categoryButtons.forEach(function (btn) {
      const isActive = btn.getAttribute('data-category') === state.category;
      btn.classList.toggle('btn-primary', isActive);
      btn.classList.toggle('btn-outline-secondary', !isActive);
    });
  }

  function updateListTitle() {
    if (!dom.listTitle) return;
    const label = categoryLabels[state.category] || 'Items';
    dom.listTitle.textContent = label;
    if (dom.addItemBtn) {
      dom.addItemBtn.textContent = '+ Add ' + singularLabel(state.category);
    }
  }

  function renderList() {
    if (!dom.recordList) return;
    dom.recordList.innerHTML = '';

    if (!state.data) {
      dom.recordList.innerHTML = '<div class="list-group-item text-muted">Loading…</div>';
      return;
    }

    const records = getRecordsForCategory(state.category);
    if (!records.length) {
      dom.recordList.innerHTML = '<div class="list-group-item text-muted">No items yet. Add one to get started.</div>';
      return;
    }

    records.forEach(function (record, index) {
      const item = document.createElement('div');
      item.className = 'list-group-item d-flex justify-content-between align-items-center';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.dataset.id = record.id;

      if (record.id === state.selectedId && !state.editingNew) {
        item.classList.add('active');
      }

      const textWrap = document.createElement('div');
      const titleEl = document.createElement('div');
      titleEl.className = 'font-weight-bold';
      titleEl.textContent = record.title || record.id || '(Untitled)';
      const metaEl = document.createElement('div');
      metaEl.className = 'small text-muted';
      metaEl.textContent = record.subtitle || record.id;
      textWrap.appendChild(titleEl);
      textWrap.appendChild(metaEl);

      const controls = document.createElement('div');
      controls.className = 'btn-group btn-group-sm';
      const upBtn = document.createElement('button');
      upBtn.type = 'button';
      upBtn.className = 'btn btn-light';
      upBtn.innerHTML = '<span aria-hidden="true">&#8593;</span><span class="sr-only">Move up</span>';
      upBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        moveRecord(state.category, index, -1);
      });
      const downBtn = document.createElement('button');
      downBtn.type = 'button';
      downBtn.className = 'btn btn-light';
      downBtn.innerHTML = '<span aria-hidden="true">&#8595;</span><span class="sr-only">Move down</span>';
      downBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        moveRecord(state.category, index, 1);
      });

      controls.appendChild(upBtn);
      controls.appendChild(downBtn);

      item.appendChild(textWrap);
      item.appendChild(controls);

      item.addEventListener('click', function () {
        selectRecord(record.id);
      });
      item.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectRecord(record.id);
        }
      });

      dom.recordList.appendChild(item);
    });
  }

  function moveRecord(category, index, delta) {
    if (!state.data) return;
    const target = index + delta;
    if (target < 0) return;

    if (category === 'projects') {
      if (target >= state.data.projectCards.length) return;
      const list = state.data.projectCards;
      list.splice(target, 0, list.splice(index, 1)[0]);
    } else if (category === 'awards') {
      if (target >= state.data.awardsCards.length) return;
      const list = state.data.awardsCards;
      list.splice(target, 0, list.splice(index, 1)[0]);
    } else if (category === 'activities') {
      if (target >= state.data.activityOrder.length) return;
      const list = state.data.activityOrder;
      list.splice(target, 0, list.splice(index, 1)[0]);
    } else {
      return;
    }

    markDirty();
    renderList();
    setStatus('Updated order for ' + categoryLabels[category].toLowerCase());
  }

  function selectRecord(id) {
    if (!state.data) return;
    state.selectedId = id;
    state.editingNew = false;
    state.draft = null;
    renderList();
    renderEditor();
  }

  function handleAddNew() {
    if (!state.data) return;
    state.selectedId = null;
    state.editingNew = true;
    state.draft = createDefaultRecord(state.category);
    renderList();
    renderEditor();
  }

  function renderEditor() {
    if (!dom.editorBody || !dom.editorTitle) return;

    dom.editorBody.innerHTML = '';

    if (!state.data) {
      dom.editorTitle.textContent = 'Loading…';
      dom.editorBody.innerHTML = '<p class="text-muted mb-0">Waiting for content to load.</p>';
      return;
    }

    if (state.editingNew && state.draft) {
      dom.editorTitle.textContent = 'Add New ' + singularLabel(state.category);
      dom.editorBody.appendChild(buildForm(state.category, state.draft, true));
      return;
    }

    if (!state.selectedId) {
      dom.editorTitle.textContent = 'Select an item to edit';
      dom.editorBody.innerHTML = '<p class="text-muted mb-0">Choose a record on the left or click "Add New" to start.</p>';
      return;
    }

    const record = getRecordForEdit(state.category, state.selectedId);
    if (!record) {
      dom.editorTitle.textContent = 'Record not found';
      dom.editorBody.innerHTML = '<p class="text-danger mb-0">The selected record could not be loaded. It may have been removed.</p>';
      return;
    }

    dom.editorTitle.textContent = 'Editing ' + (record.card.title || record.id);
    dom.editorBody.appendChild(buildForm(state.category, record, false));
  }

  function buildForm(category, record, isNew) {
    const form = document.createElement('form');
    form.className = 'admin-form';

    form.innerHTML = [
      '<div class="form-row">',
        '<div class="form-group col-md-4">',
          '<label for="field-id">ID</label>',
          '<input type="text" class="form-control" id="field-id" name="id" required value="' + escapeHtml(record.id || '') + '" />',
          '<small class="form-text text-muted">Unique identifier used across the site.</small>',
        '</div>',
        category === 'activities'
          ? '<div class="form-group col-md-4">' +
              '<label for="field-group">Group</label>' +
              buildGroupSelect(record.card.group) +
            '</div>'
          : '',
        '<div class="form-group col-md-4">',
          '<label for="field-cardImage">Card Image Path</label>',
          '<input type="text" class="form-control" id="field-cardImage" name="cardImage" value="' + escapeHtml(record.card.image || '') + '" />',
        '</div>',
      '</div>',
      '<div class="form-group">',
        '<label for="field-cardTitle">Card Title</label>',
        '<input type="text" class="form-control" id="field-cardTitle" name="cardTitle" value="' + escapeHtml(record.card.title || '') + '" />',
      '</div>',
      '<div class="form-row">',
        '<div class="form-group col-md-4">',
          '<label for="field-cardTag">Card Tag</label>',
          '<input type="text" class="form-control" id="field-cardTag" name="cardTag" value="' + escapeHtml(record.card.tag || '') + '" />',
        '</div>',
        '<div class="form-group col-md-4">',
          '<label for="field-cardMeta">Card Meta</label>',
          '<input type="text" class="form-control" id="field-cardMeta" name="cardMeta" value="' + escapeHtml(record.card.meta || '') + '" />',
        '</div>',
        '<div class="form-group col-md-4">',
          '<label for="field-cardSummary">Card Summary</label>',
          '<textarea class="form-control" id="field-cardSummary" name="cardSummary" rows="2">' + escapeHtml(record.card.summary || '') + '</textarea>',
        '</div>',
      '</div>',
      '<hr />',
      '<div class="form-group">',
        '<label for="field-modalTitle">Modal Title</label>',
        '<input type="text" class="form-control" id="field-modalTitle" name="modalTitle" value="' + escapeHtml(record.detail.title || '') + '" />',
      '</div>',
      '<div class="form-row">',
        '<div class="form-group col-md-6">',
          '<label for="field-modalCategory">Modal Category</label>',
          '<input type="text" class="form-control" id="field-modalCategory" name="modalCategory" value="' + escapeHtml(record.detail.category || '') + '" />',
        '</div>',
        '<div class="form-group col-md-6">',
          '<label for="field-modalDate">Modal Date</label>',
          '<input type="text" class="form-control" id="field-modalDate" name="modalDate" value="' + escapeHtml(record.detail.date || '') + '" />',
        '</div>',
      '</div>',
      '<div class="form-group">',
        '<label for="field-modalDescription">Modal Description</label>',
        '<textarea class="form-control" id="field-modalDescription" name="modalDescription" rows="5">' + escapeHtml(record.detail.description || '') + '</textarea>',
        '<small class="form-text text-muted">HTML is allowed.</small>',
      '</div>'
    ].join('');

    // Images section
    const imageSection = document.createElement('section');
    imageSection.className = 'array-section';

    const imageHeader = document.createElement('div');
    imageHeader.className = 'array-editor-header';
    const imageTitle = document.createElement('h3');
    imageTitle.textContent = 'Modal Images';
    const addImageBtn = document.createElement('button');
    addImageBtn.type = 'button';
    addImageBtn.className = 'btn btn-sm btn-outline-primary';
    addImageBtn.textContent = 'Add image';
    imageHeader.appendChild(imageTitle);
    imageHeader.appendChild(addImageBtn);

    const imageList = document.createElement('div');
    imageList.id = 'imageList';
    ensureArray(record.detail.images).forEach(function (img) {
      imageList.appendChild(createImageRow(img));
    });

    addImageBtn.addEventListener('click', function () {
      imageList.appendChild(createImageRow({ src: '', alt: '' }));
    });

    imageSection.appendChild(imageHeader);
    imageSection.appendChild(imageList);
    form.appendChild(imageSection);

    // Certificates section
    const certSection = document.createElement('section');
    certSection.className = 'array-section';
    const certHeader = document.createElement('div');
    certHeader.className = 'array-editor-header';
    const certTitle = document.createElement('h3');
    certTitle.textContent = 'Certificates (optional)';
    const addCertBtn = document.createElement('button');
    addCertBtn.type = 'button';
    addCertBtn.className = 'btn btn-sm btn-outline-primary';
    addCertBtn.textContent = 'Add certificate';
    certHeader.appendChild(certTitle);
    certHeader.appendChild(addCertBtn);

    const certList = document.createElement('div');
    certList.id = 'certificateList';
    ensureArray(record.detail.certificates).forEach(function (cert) {
      certList.appendChild(createCertificateRow(cert));
    });

    addCertBtn.addEventListener('click', function () {
      certList.appendChild(createCertificateRow({ title: '', issuer: '', year: '', image: '', description: '', link: '' }));
    });

    certSection.appendChild(certHeader);
    certSection.appendChild(certList);
    form.appendChild(certSection);

    // Footer buttons
    const footer = document.createElement('div');
    footer.className = 'd-flex justify-content-between align-items-center mt-4';
    if (!isNew) {
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn btn-outline-danger';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', function () {
        handleDeleteRecord(category, record.id);
      });
      footer.appendChild(deleteBtn);
    } else {
      const spacer = document.createElement('div');
      footer.appendChild(spacer);
    }

    const actionGroup = document.createElement('div');
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-secondary mr-2';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', handleCancelEdit);
    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = 'Save';
    actionGroup.appendChild(cancelBtn);
    actionGroup.appendChild(saveBtn);
    footer.appendChild(actionGroup);

    form.appendChild(footer);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      saveRecord(category, record, isNew, form);
    });

    return form;
  }

  function buildGroupSelect(current) {
    const options = ['extracurricular', 'leadership'];
    return [
      '<select class="form-control" id="field-group" name="group">',
      options.map(function (opt) {
        const selected = opt === current ? ' selected' : '';
        const label = opt === 'extracurricular' ? 'Extracurricular' : 'Leadership';
        return '<option value="' + opt + '"' + selected + '>' + label + '</option>';
      }).join(''),
      '</select>'
    ].join('');
  }

  function createImageRow(image) {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-group image-row';
    wrapper.innerHTML = [
      '<div class="form-row">',
        '<div class="form-group col-md-7">',
          '<label>Image path</label>',
          '<input type="text" class="form-control image-src" value="' + escapeHtml(image.src || '') + '" />',
        '</div>',
        '<div class="form-group col-md-5">',
          '<label>Alt text</label>',
          '<input type="text" class="form-control image-alt" value="' + escapeHtml(image.alt || '') + '" />',
        '</div>',
      '</div>',
      '<div class="array-group__actions">',
        '<button type="button" class="btn btn-sm btn-outline-danger remove-image">Remove image</button>',
      '</div>'
    ].join('');

    const removeBtn = wrapper.querySelector('.remove-image');
    removeBtn.addEventListener('click', function () {
      wrapper.remove();
    });

    return wrapper;
  }

  function createCertificateRow(cert) {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-group certificate-row';
    wrapper.innerHTML = [
      '<div class="form-row">',
        '<div class="form-group col-md-6">',
          '<label>Title</label>',
          '<input type="text" class="form-control cert-title" value="' + escapeHtml(cert.title || '') + '" />',
        '</div>',
        '<div class="form-group col-md-3">',
          '<label>Issuer</label>',
          '<input type="text" class="form-control cert-issuer" value="' + escapeHtml(cert.issuer || '') + '" />',
        '</div>',
        '<div class="form-group col-md-3">',
          '<label>Year</label>',
          '<input type="text" class="form-control cert-year" value="' + escapeHtml(cert.year || '') + '" />',
        '</div>',
      '</div>',
      '<div class="form-row">',
        '<div class="form-group col-md-6">',
          '<label>Image path</label>',
          '<input type="text" class="form-control cert-image" value="' + escapeHtml(cert.image || '') + '" />',
        '</div>',
        '<div class="form-group col-md-6">',
          '<label>Credential link (optional)</label>',
          '<input type="text" class="form-control cert-link" value="' + escapeHtml(cert.link || '') + '" />',
        '</div>',
      '</div>',
      '<div class="form-group">',
        '<label>Description (HTML allowed)</label>',
        '<textarea class="form-control cert-description" rows="3">' + escapeHtml(cert.description || '') + '</textarea>',
      '</div>',
      '<div class="array-group__actions">',
        '<button type="button" class="btn btn-sm btn-outline-danger remove-cert">Remove certificate</button>',
      '</div>'
    ].join('');

    const removeBtn = wrapper.querySelector('.remove-cert');
    removeBtn.addEventListener('click', function () {
      wrapper.remove();
    });

    return wrapper;
  }

  function saveRecord(category, record, isNew, form) {
    const formData = new FormData(form);
    const id = (formData.get('id') || '').trim();
    if (!id) {
      alert('ID is required.');
      return;
    }

    const excludeId = isNew ? null : record.id;
    if (isIdTaken(id, excludeId)) {
      alert('The ID "' + id + '" is already used by another record.');
      return;
    }

    const card = {
      id: id,
      image: (formData.get('cardImage') || '').trim(),
      title: (formData.get('cardTitle') || '').trim(),
      tag: (formData.get('cardTag') || '').trim(),
      meta: (formData.get('cardMeta') || '').trim(),
      summary: (formData.get('cardSummary') || '').trim()
    };
    const detail = {
      title: (formData.get('modalTitle') || '').trim(),
      category: (formData.get('modalCategory') || '').trim(),
      date: (formData.get('modalDate') || '').trim(),
      description: (formData.get('modalDescription') || '').trim(),
      images: collectImages(form),
      certificates: collectCertificates(form)
    };

    if (!detail.title && card.title) detail.title = card.title;
    if (!detail.category && card.tag) detail.category = card.tag;

    if (category === 'projects') {
      persistProjectRecord(id, card, detail, isNew, record.id);
    } else if (category === 'awards') {
      persistAwardRecord(id, card, detail, isNew, record.id);
    } else if (category === 'activities') {
      const group = formData.get('group') || 'extracurricular';
      card.group = group;
      persistActivityRecord(id, card, detail, isNew, record.id);
    } else {
      alert('Unknown category: ' + category);
      return;
    }

    state.selectedId = id;
    state.editingNew = false;
    state.draft = null;
    markDirty();
    renderList();
    renderEditor();
    setStatus('Saved ' + singularLabel(category) + ' "' + id + '"');
  }

  function persistProjectRecord(id, card, detail, isNew, previousId) {
    if (!state.data) return;
    if (isNew) {
      state.data.projectCards.push(card);
    } else {
      const index = state.data.projectCards.findIndex(function (item) { return item.id === previousId; });
      if (index === -1) {
        alert('Could not find the project to update.');
        return;
      }
      state.data.projectCards[index] = card;
    }
    if (!state.data.modalDetails) state.data.modalDetails = {};
    if (!isNew && previousId && previousId !== id) {
      delete state.data.modalDetails[previousId];
    }
    state.data.modalDetails[id] = detail;
  }

  function persistAwardRecord(id, card, detail, isNew, previousId) {
    if (!state.data) return;
    if (isNew) {
      state.data.awardsCards.push(card);
    } else {
      const index = state.data.awardsCards.findIndex(function (item) { return item.id === previousId; });
      if (index === -1) {
        alert('Could not find the award to update.');
        return;
      }
      state.data.awardsCards[index] = card;
    }
    if (!state.data.modalDetails) state.data.modalDetails = {};
    if (!isNew && previousId && previousId !== id) {
      delete state.data.modalDetails[previousId];
    }
    state.data.modalDetails[id] = detail;
  }

  function persistActivityRecord(id, card, detail, isNew, previousId) {
    if (!state.data) return;
    if (!state.data.activityDetails) state.data.activityDetails = {};
    if (!state.data.activityOrder) state.data.activityOrder = [];

    const tile = {
      group: card.group || 'extracurricular',
      title: card.title || detail.title || '',
      tag: card.tag || '',
      meta: card.meta || '',
      summary: card.summary || '',
      image: card.image || ''
    };

    if (isNew) {
      state.data.activityDetails[id] = tile;
      state.data.activityOrder.push(id);
    } else {
      const existed = state.data.activityDetails[previousId];
      if (!existed) {
        alert('Could not find the activity to update.');
        return;
      }
      if (previousId !== id) {
        delete state.data.activityDetails[previousId];
        const orderIndex = state.data.activityOrder.indexOf(previousId);
        if (orderIndex !== -1) {
          state.data.activityOrder[orderIndex] = id;
        }
      }
      state.data.activityDetails[id] = tile;
    }

    if (!state.data.modalDetails) state.data.modalDetails = {};
    if (!isNew && previousId && previousId !== id) {
      delete state.data.modalDetails[previousId];
    }
    state.data.modalDetails[id] = detail;
  }

  function handleDeleteRecord(category, id) {
    if (!state.data) return;
    const confirmed = window.confirm('Delete "' + id + '"? This cannot be undone.');
    if (!confirmed) return;

    if (category === 'projects') {
      state.data.projectCards = state.data.projectCards.filter(function (item) { return item.id !== id; });
    } else if (category === 'awards') {
      state.data.awardsCards = state.data.awardsCards.filter(function (item) { return item.id !== id; });
    } else if (category === 'activities') {
      delete state.data.activityDetails[id];
      state.data.activityOrder = state.data.activityOrder.filter(function (item) { return item !== id; });
    }
    if (state.data.modalDetails) {
      delete state.data.modalDetails[id];
    }

    state.selectedId = null;
    state.editingNew = false;
    state.draft = null;
    markDirty();
    renderList();
    renderEditor();
    setStatus('Deleted ' + singularLabel(category) + ' "' + id + '"');
  }

  function handleCancelEdit() {
    state.editingNew = false;
    state.draft = null;
    renderList();
    renderEditor();
  }

  function handleExport() {
    if (!state.data) {
      alert('No data to export yet.');
      return;
    }
    const json = JSON.stringify(state.data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    setStatus('Exported content.json');
  }

  function handleReset() {
    if (!state.originalData) return;
    const confirmed = window.confirm('Discard all unsaved changes and reset to the last loaded data?');
    if (!confirmed) return;
    state.data = clone(state.originalData);
    state.selectedId = null;
    state.editingNew = false;
    state.draft = null;
    state.dirty = false;
    renderList();
    renderEditor();
    setStatus('Changes reset.');
  }

  function handleImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        state.data = sanitiseContent(parsed);
        state.originalData = clone(state.data);
        state.selectedId = null;
        state.editingNew = false;
        state.draft = null;
        state.dirty = false;
        renderAll();
        setStatus('Imported data from ' + file.name);
      } catch (err) {
        console.error('Failed to parse imported JSON', err);
        alert('The selected file could not be parsed as JSON.');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  function collectImages(form) {
    const rows = form.querySelectorAll('.image-row');
    const images = [];
    rows.forEach(function (row) {
      const src = (row.querySelector('.image-src').value || '').trim();
      const alt = (row.querySelector('.image-alt').value || '').trim();
      if (src) {
        images.push({ src: src, alt: alt });
      }
    });
    return images;
  }

  function collectCertificates(form) {
    const rows = form.querySelectorAll('.certificate-row');
    const certs = [];
    rows.forEach(function (row) {
      const title = (row.querySelector('.cert-title').value || '').trim();
      const issuer = (row.querySelector('.cert-issuer').value || '').trim();
      const year = (row.querySelector('.cert-year').value || '').trim();
      const image = (row.querySelector('.cert-image').value || '').trim();
      const link = (row.querySelector('.cert-link').value || '').trim();
      const description = (row.querySelector('.cert-description').value || '').trim();

      if (title || issuer || year || image || description || link) {
        const cert = {};
        if (title) cert.title = title;
        if (issuer) cert.issuer = issuer;
        if (year) cert.year = year;
        if (image) cert.image = image;
        if (description) cert.description = description;
        if (link) cert.link = link;
        certs.push(cert);
      }
    });
    return certs;
  }

  function getRecordsForCategory(category) {
    if (!state.data) return [];
    if (category === 'projects') {
      return state.data.projectCards.map(function (card) {
        return {
          id: card.id,
          title: card.title || card.id,
          subtitle: card.tag || card.meta || ''
        };
      });
    }
    if (category === 'awards') {
      return state.data.awardsCards.map(function (card) {
        return {
          id: card.id,
          title: card.title || card.id,
          subtitle: card.meta || card.tag || ''
        };
      });
    }
    if (category === 'activities') {
      return state.data.activityOrder.map(function (id) {
        const tile = state.data.activityDetails[id] || {};
        return {
          id: id,
          title: tile.title || id,
          subtitle: tile.group ? tile.group.charAt(0).toUpperCase() + tile.group.slice(1) : ''
        };
      });
    }
    return [];
  }

  function getRecordForEdit(category, id) {
    if (!state.data) return null;
    const detail = ensureDetail(clone(state.data.modalDetails[id] || {}));

    if (category === 'projects') {
      const card = state.data.projectCards.find(function (item) { return item.id === id; });
      if (!card) return null;
      return {
        id: id,
        card: clone(card),
        detail: detail
      };
    }

    if (category === 'awards') {
      const card = state.data.awardsCards.find(function (item) { return item.id === id; });
      if (!card) return null;
      return {
        id: id,
        card: clone(card),
        detail: detail
      };
    }

    if (category === 'activities') {
      const tile = state.data.activityDetails[id];
      if (!tile) return null;
      return {
        id: id,
        card: clone(tile),
        detail: detail
      };
    }

    return null;
  }

  function createDefaultRecord(category) {
    const detail = ensureDetail({});
    if (category === 'projects' || category === 'awards') {
      return {
        id: '',
        card: { id: '', image: '', title: '', tag: '', meta: '', summary: '' },
        detail: detail
      };
    }
    if (category === 'activities') {
      return {
        id: '',
        card: { id: '', group: 'extracurricular', title: '', tag: '', meta: '', summary: '', image: '' },
        detail: detail
      };
    }
    return { id: '', card: {}, detail: detail };
  }

  function ensureDetail(detail) {
    const safe = detail && typeof detail === 'object' ? detail : {};
    if (!Array.isArray(safe.images)) safe.images = [];
    if (!Array.isArray(safe.certificates)) safe.certificates = [];
    return safe;
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function singularLabel(category) {
    const map = { projects: 'Project', awards: 'Award', activities: 'Activity' };
    return map[category] || 'Item';
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function markDirty() {
    state.dirty = true;
  }

  function setStatus(message, type) {
    if (!dom.statusLine) return;
    const counts = state.data
      ? 'Projects: ' + state.data.projectCards.length +
        ', Awards: ' + state.data.awardsCards.length +
        ', Activities: ' + state.data.activityOrder.length
      : 'No data';
    const dirtyNote = state.dirty ? ' Unsaved changes.' : '';
    dom.statusLine.textContent = 'Status: ' + message + ' — ' + counts + '.' + dirtyNote;
    dom.statusLine.classList.toggle('text-danger', type === 'error');
    if (type !== 'error') {
      dom.statusLine.classList.remove('text-danger');
    }
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isIdTaken(id, excludeId) {
    if (!state.data || !id) return false;
    const match = function (value) { return value === id && value !== excludeId; };

    if (state.data.modalDetails && state.data.modalDetails.hasOwnProperty(id) && id !== excludeId) {
      return true;
    }
    if (state.data.projectCards.some(function (item) { return match(item.id); })) return true;
    if (state.data.awardsCards.some(function (item) { return match(item.id); })) return true;
    if (state.data.activityOrder.some(function (item) { return match(item); })) return true;
    return false;
  }
})();
