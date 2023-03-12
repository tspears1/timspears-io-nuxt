<script setup>

</script>

<template>
    <nav class="filter-bar">
        <Button
            text="All"
            size="compressed"
            icon="grommet"
            theme="light"
            :panel-count="3"
            active
            naked
        />
        <Button
            text="Services"
            size="compressed"
            icon="caret-down"
            theme="light"
            :panel-count="4"
        />
        <Button
            text="Awarded"
            size="compressed"
            icon="grommet"
            theme="light"
            :panel-count="4"
        />
    </nav>
</template>